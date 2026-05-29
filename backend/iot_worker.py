from __future__ import annotations

import argparse
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.app import IOT_WORKER_INTERVAL_SECONDS, scan_iot_alerts  # noqa: E402


def run_once() -> int:
    return scan_iot_alerts()


def run_loop(interval_seconds: int = IOT_WORKER_INTERVAL_SECONDS) -> None:
    import threading

    stop_event = threading.Event()
    while not stop_event.wait(interval_seconds):
        scan_iot_alerts()


def main() -> int:
    parser = argparse.ArgumentParser(description="Process IoT telemetry alerts.")
    parser.add_argument("--once", action="store_true", help="Run a single alert scan and exit.")
    parser.add_argument("--interval", type=int, default=IOT_WORKER_INTERVAL_SECONDS, help="Polling interval in seconds.")
    args = parser.parse_args()

    if args.once:
        created = run_once()
        print(f"Created {created} alert(s).")
        return 0

    run_loop(args.interval)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())