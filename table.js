/* =====================================================
FILTER BUTTONS
===================================================== */

const filterBtns =
  document.querySelectorAll(
    ".filter-btn"
  );

filterBtns.forEach(btn=>{

  btn.addEventListener(
    "click",
    ()=>{

      filterBtns.forEach(b=>
        b.classList.remove("active")
      );

      btn.classList.add("active");

    }
  );

});

/* =====================================================
SEARCH
===================================================== */

const searchInput =
  document.getElementById(
    "searchInput"
  );

const tableCards =
  document.querySelectorAll(
    ".table-card"
  );

searchInput.addEventListener(
  "input",
  e=>{

    const value =
      e.target.value.toLowerCase();

    tableCards.forEach(card=>{

      const text =
        card.innerText.toLowerCase();

      card.style.display =
        text.includes(value)
        ? "block"
        : "none";

    });

  }
);

function exportTable(button, type) {
  const table = button.closest(".section").querySelector("table");
  const rows = Array.from(table.querySelectorAll("tr"));
  const data = rows.map(row =>
    Array.from(row.querySelectorAll("th, td")).map(cell => cell.innerText)
  );

  if (type === "csv") {
    const csvContent = data.map(e => e.join(",")).join("\n");
    downloadFile(csvContent, "table.csv", "text/csv");
  }

  if (type === "excel") {
    const excelContent = data.map(e => e.join("\t")).join("\n");
    downloadFile(excelContent, "table.xls", "application/vnd.ms-excel");
  }

  if (type === "pdf") {
    const pdfWindow = window.open("", "_blank");
    pdfWindow.document.write("<pre>" + data.map(e => e.join(" | ")).join("\n") + "</pre>");
    pdfWindow.document.close();
    pdfWindow.print();
  }

  alert(`✅ Table exported as ${type.toUpperCase()}!`);
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}


/* =====================================================
COUNTER ANIMATION
===================================================== */

function animateValue(
  id,
  start,
  end,
  duration
){

  let range = end - start;

  let current = start;

  let increment =
    end > start ? 1 : -1;

  let stepTime =
    Math.abs(
      Math.floor(duration / range)
    );

  const obj =
    document.getElementById(id);

  const timer =
    setInterval(()=>{

      current += increment;

      if(id === "growthCount"){

        obj.innerHTML =
          current + "%";

      }else{

        obj.innerHTML =
          current.toLocaleString();

      }

      if(current == end){

        clearInterval(timer);
      }

    },stepTime);

}

animateValue(
  "viewsCount",
  0,
  98450,
  1200
);

animateValue(
  "usersCount",
  0,
  12420,
  1200
);

animateValue(
  "salesCount",
  0,
  842,
  1200
);

animateValue(
  "growthCount",
  0,
  78,
  1200
);

/* =====================================================
NAVBAR SCROLL EFFECT
===================================================== */

window.addEventListener(
  "scroll",
  ()=>{

    const navbar =
      document.querySelector(
        ".navbar"
      );

    if(window.scrollY > 20){

      navbar.style.background =
        "rgba(5,8,22,.95)";

    }else{

      navbar.style.background =
        "rgba(5,8,22,.8)";
    }

  }
);