const palette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function generatePalette() {
    palette.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const color = getRandomColor();

        const colorBox = document.createElement("div");
        colorBox.classList.add("color-box");
        colorBox.style.backgroundColor = color;

        const colorCode = document.createElement("div");
        colorCode.classList.add("color-code");
        colorCode.textContent = color;

        colorBox.appendChild(colorCode);

        colorBox.addEventListener("click", () => {
            navigator.clipboard.writeText(color);

            colorCode.textContent = "Copied!";
            setTimeout(() => {
                colorCode.textContent = color;
            }, 1000);
        });

        palette.appendChild(colorBox);
    }
}

generateBtn.addEventListener("click", generatePalette);

// Generate default palette on load
generatePalette();