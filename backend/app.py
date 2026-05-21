from __future__ import annotations

import hashlib
import sqlite3
from datetime import datetime, timedelta
from pathlib import Path

import pandas as pd
from flask import Flask, jsonify, redirect, request, send_from_directory
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent
DATA_PATH = BASE_DIR / "data" / "crop_history.csv"
TRACE_DB_PATH = BASE_DIR / "data" / "produce_traceability.sqlite3"

PRICE_PER_TON = {
    "Corn": 320,
    "Wheat": 400,
    "Rice": 460,
    "Soybean": 520,
    "Cotton": 610,
}

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    response.headers.setdefault("Access-Control-Allow-Origin", "*")
    response.headers.setdefault("Access-Control-Allow-Headers", "Content-Type")
    response.headers.setdefault("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    return response

FARMERS = [
    (1, "Asha Patel", "Modasa, Gujarat"),
    (2, "Rahul Verma", "Karnal, Haryana"),
    (3, "Meera Nair", "Erode, Tamil Nadu"),
]

CROPS = [
    (1, "Corn", "Sweet Gold"),
    (2, "Wheat", "Durum"),
    (3, "Rice", "Jaya"),
]

BATCH_SEEDS = [
    {
        "id": 101,
        "batch_code": "BATCH-101-ALPHA",
        "farmer_id": 1,
        "crop_id": 1,
        "planting_date": "2026-01-12",
        "harvest_date": "2026-05-04",
        "fertilizer_summary": "Compost, NPK 10-26-26, seaweed extract",
        "acreage": 12.5,
        "batch_notes": "North field block A",
    },
    {
        "id": 102,
        "batch_code": "BATCH-102-BRAVO",
        "farmer_id": 2,
        "crop_id": 2,
        "planting_date": "2026-01-18",
        "harvest_date": "2026-05-16",
        "fertilizer_summary": "Farmyard manure, urea, potassium sulfate",
        "acreage": 18.0,
        "batch_notes": "River belt parcel 7",
    },
    {
        "id": 103,
        "batch_code": "BATCH-103-CHARLIE",
        "farmer_id": 3,
        "crop_id": 3,
        "planting_date": "2026-02-02",
        "harvest_date": "2026-06-01",
        "fertilizer_summary": "Vermicompost, DAP, micronutrient spray",
        "acreage": 20.0,
        "batch_notes": "Lowland paddy zone",
    },
]

LEDGER_EVENTS = [
    ("Planted", 0, "Seeds placed and irrigation activated."),
    ("Fertilized", 18, "Primary fertilizer treatment completed."),
    ("Harvested", 112, "Crop harvested and quality inspected."),
    ("Shipped", 118, "Sealed batch shipped to distribution center."),
]


def load_model() -> Pipeline:
    data = pd.read_csv(DATA_PATH)
    features = ["acreage", "seed_cost", "fertilizer_cost", "budget", "soil_type", "target_crop"]
    target = "historical_yield_tons"

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "categorical",
                OneHotEncoder(handle_unknown="ignore", sparse_output=False),
                ["soil_type", "target_crop"],
            ),
        ],
        remainder="passthrough",
    )

    model = RandomForestRegressor(n_estimators=200, random_state=42)
    pipeline = Pipeline([
        ("preprocessor", preprocessor),
        ("model", model),
    ])
    pipeline.fit(data[features], data[target])
    return pipeline


MODEL = load_model()


def get_traceability_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(TRACE_DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def compute_event_hash(batch_id: int, event_type: str, event_date: str, details: str, previous_hash: str) -> str:
    payload = f"{batch_id}|{event_type}|{event_date}|{details}|{previous_hash}"
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def ensure_traceability_db() -> None:
    TRACE_DB_PATH.parent.mkdir(parents=True, exist_ok=True)

    with get_traceability_connection() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS farmers (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                location TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS crops (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                variety TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS batches (
                id INTEGER PRIMARY KEY,
                batch_code TEXT NOT NULL UNIQUE,
                farmer_id INTEGER NOT NULL,
                crop_id INTEGER NOT NULL,
                planting_date TEXT NOT NULL,
                harvest_date TEXT NOT NULL,
                fertilizer_summary TEXT NOT NULL,
                acreage REAL NOT NULL,
                batch_notes TEXT,
                created_at TEXT NOT NULL,
                FOREIGN KEY (farmer_id) REFERENCES farmers(id),
                FOREIGN KEY (crop_id) REFERENCES crops(id)
            );

            CREATE TABLE IF NOT EXISTS ledger_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                batch_id INTEGER NOT NULL,
                event_type TEXT NOT NULL,
                event_date TEXT NOT NULL,
                details TEXT NOT NULL,
                previous_hash TEXT NOT NULL,
                event_hash TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY (batch_id) REFERENCES batches(id)
            );
            """
        )

        if connection.execute("SELECT COUNT(*) FROM batches").fetchone()[0]:
            return

        connection.executemany("INSERT INTO farmers (id, name, location) VALUES (?, ?, ?)", FARMERS)
        connection.executemany("INSERT INTO crops (id, name, variety) VALUES (?, ?, ?)", CROPS)

        for batch in BATCH_SEEDS:
            created_at = datetime.utcnow().isoformat(timespec="seconds") + "Z"
            connection.execute(
                """
                INSERT INTO batches (
                    id, batch_code, farmer_id, crop_id, planting_date, harvest_date,
                    fertilizer_summary, acreage, batch_notes, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    batch["id"],
                    batch["batch_code"],
                    batch["farmer_id"],
                    batch["crop_id"],
                    batch["planting_date"],
                    batch["harvest_date"],
                    batch["fertilizer_summary"],
                    batch["acreage"],
                    batch["batch_notes"],
                    created_at,
                ),
            )

            previous_hash = "GENESIS"
            planting_date = datetime.fromisoformat(batch["planting_date"])
            harvest_date = datetime.fromisoformat(batch["harvest_date"])
            timeline = [
                (event_type, planting_date + timedelta(days=offset), details)
                for event_type, offset, details in LEDGER_EVENTS
            ]

            for event_type, event_date, details in timeline:
                event_date_iso = event_date.date().isoformat()
                event_hash = compute_event_hash(batch["id"], event_type, event_date_iso, details, previous_hash)
                connection.execute(
                    """
                    INSERT INTO ledger_events (
                        batch_id, event_type, event_date, details, previous_hash, event_hash, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        batch["id"],
                        event_type,
                        event_date_iso,
                        details,
                        previous_hash,
                        event_hash,
                        created_at,
                    ),
                )
                previous_hash = event_hash


def fetch_batch_detail(batch_id: int) -> dict[str, object] | None:
    with get_traceability_connection() as connection:
        batch = connection.execute(
            """
            SELECT
                b.id,
                b.batch_code,
                b.planting_date,
                b.harvest_date,
                b.fertilizer_summary,
                b.acreage,
                b.batch_notes,
                b.created_at,
                f.name AS farmer_name,
                f.location AS farmer_location,
                c.name AS crop_name,
                c.variety AS crop_variety
            FROM batches b
            JOIN farmers f ON f.id = b.farmer_id
            JOIN crops c ON c.id = b.crop_id
            WHERE b.id = ?
            """,
            (batch_id,),
        ).fetchone()

        if batch is None:
            return None

        events = connection.execute(
            """
            SELECT event_type, event_date, details, previous_hash, event_hash
            FROM ledger_events
            WHERE batch_id = ?
            ORDER BY id ASC
            """,
            (batch_id,),
        ).fetchall()

    trace_url = f"/verify-produce?batch_id={batch_id}"
    return {
        "batch": {
            "id": batch["id"],
            "batch_code": batch["batch_code"],
            "planting_date": batch["planting_date"],
            "harvest_date": batch["harvest_date"],
            "fertilizer_summary": batch["fertilizer_summary"],
            "acreage": batch["acreage"],
            "batch_notes": batch["batch_notes"],
            "created_at": batch["created_at"],
            "farmer": {
                "name": batch["farmer_name"],
                "location": batch["farmer_location"],
            },
            "crop": {
                "name": batch["crop_name"],
                "variety": batch["crop_variety"],
            },
            "trace_url": trace_url,
        },
        "events": [
            {
                "event_type": event["event_type"],
                "event_date": event["event_date"],
                "details": event["details"],
                "previous_hash": event["previous_hash"],
                "event_hash": event["event_hash"],
            }
            for event in events
        ],
    }


ensure_traceability_db()


@app.get("/health")
def health() -> tuple[dict[str, str], int]:
    return {"status": "ok"}, 200


@app.post("/predict_roi")
def predict_roi() -> tuple[dict[str, object], int]:
    payload = request.get_json(silent=True) or {}

    try:
        acreage = float(payload["acreage"])
        seed_cost = float(payload["seed_cost"])
        fertilizer_cost = float(payload["fertilizer_cost"])
        budget = float(payload["budget"])
        soil_type = str(payload["soil_type"])
        target_crop = str(payload["target_crop"])
    except (KeyError, TypeError, ValueError):
        return jsonify({"error": "Invalid forecast payload."}), 400

    if acreage <= 0 or seed_cost < 0 or fertilizer_cost < 0 or budget < 0:
        return jsonify({"error": "Input values must be positive."}), 400

    frame = pd.DataFrame([
        {
            "acreage": acreage,
            "seed_cost": seed_cost,
            "fertilizer_cost": fertilizer_cost,
            "budget": budget,
            "soil_type": soil_type,
            "target_crop": target_crop,
        }
    ])

    predicted_yield = float(MODEL.predict(frame)[0])
    crop_price = PRICE_PER_TON.get(target_crop, 380)
    projected_revenue = predicted_yield * crop_price
    total_costs = seed_cost + fertilizer_cost
    expected_profit = projected_revenue - total_costs
    roi_percent = (expected_profit / total_costs * 100) if total_costs else 0.0

    return jsonify(
        {
            "predicted_yield_tons": round(predicted_yield, 2),
            "projected_revenue": round(projected_revenue, 2),
            "total_costs": round(total_costs, 2),
            "expected_profit": round(expected_profit, 2),
            "roi_percent": round(roi_percent, 2),
            "budget_gap": round(budget - total_costs, 2),
            "crop_price_per_ton": crop_price,
        }
    ), 200


@app.get("/api/produce/batches")
def list_produce_batches() -> tuple[dict[str, object], int]:
    with get_traceability_connection() as connection:
        batches = connection.execute(
            """
            SELECT b.id, b.batch_code, b.planting_date, b.harvest_date, b.acreage,
                   f.name AS farmer_name, c.name AS crop_name
            FROM batches b
            JOIN farmers f ON f.id = b.farmer_id
            JOIN crops c ON c.id = b.crop_id
            ORDER BY b.id ASC
            """
        ).fetchall()

    return jsonify(
        {
            "batches": [
                {
                    "id": batch["id"],
                    "batch_code": batch["batch_code"],
                    "planting_date": batch["planting_date"],
                    "harvest_date": batch["harvest_date"],
                    "acreage": batch["acreage"],
                    "farmer_name": batch["farmer_name"],
                    "crop_name": batch["crop_name"],
                    "verify_url": f"/verify-produce?batch_id={batch['id']}",
                }
                for batch in batches
            ]
        }
    ), 200


@app.get("/api/produce/batches/<int:batch_id>")
def get_produce_batch(batch_id: int) -> tuple[dict[str, object], int]:
    detail = fetch_batch_detail(batch_id)
    if detail is None:
        return jsonify({"error": "Batch not found."}), 404
    return jsonify(detail), 200


@app.get("/verify-produce")
def verify_produce_entry() -> object:
    return send_from_directory(PROJECT_ROOT, "verify-produce.html")


@app.get("/trace.html")
def trace_entry() -> object:
    return send_from_directory(PROJECT_ROOT, "trace.html")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)