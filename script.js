console.log("Palette Finder JavaScript is connected!");

const colorSwatches = document.querySelectorAll(".colors li");

const copyButtons = document.querySelectorAll(".copy-colors");

copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const palette = button.closest(".palette");
    const swatches = palette.querySelectorAll(".colors li");

    const colors = [];

    swatches.forEach((swatch) => {
      colors.push(swatch.dataset.color);
    });

    const colorText = colors.join(", ");

    navigator.clipboard.writeText(colorText)
    .then(()=>{
      button.textContent = "✓ Copied!";
      setTimeout(()=>{
        button.textContent = "Copy colors";
      }, 1200);
    })
    .catch(()=>{
      button.textContent = "Copy failed!";
    });
  });
});