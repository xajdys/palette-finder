console.log("Palette Finder JavaScript is connected!");

const colorSwatches = document.querySelectorAll(".colors li");

const copyButtons = document.querySelectorAll(".copy-colors");

const noResults = document.getElementById("no-results");

copyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const palette = button.closest(".palette");
    const swatches = palette.querySelectorAll(".colors li");

    const colors = [];

    swatches.forEach((swatch) => {
      colors.push(swatch.dataset.color);
    });

    const colorText = colors.join(", ");

    navigator.clipboard
      .writeText(colorText)
      .then(() => {
        button.textContent = "✓ Copied!";
        setTimeout(() => {
          button.textContent = "Copy colors";
        }, 1200);
      })
      .catch(() => {
        button.textContent = "Copy failed!";
      });
  });
});

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoriteButtons = document.querySelectorAll(".favorite");
// console.log(favoriteButtons.length);

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    button.setAttribute("aria-pressed", button.classList.contains("active"));

    const palette = button.closest(".palette");
    const paletteName = palette.dataset.name;

    if (button.classList.contains("active")) {
      button.textContent = "★ Favorite";
      favorites.push(paletteName);
    } else {
      button.textContent = "Favorite";
      favorites = favorites.filter((name) => name !== paletteName);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  });
});

// localStorage.setItem("test", "hello");

// console.log(favoriteButtons[0].closest(".palette").dataset.name);

favoriteButtons.forEach((button) => {
  const palette = button.closest(".palette");
  const paletteName = palette.dataset.name;

  if (favorites.includes(paletteName)) {
    button.classList.add("active");
    button.textContent = "★ Favorite";
    button.setAttribute("aria-pressed", "true");
  } else {
    button.setAttribute("aria-pressed", "false");
  }
});

const moodFilter = document.getElementById("mood-filter");
const palettes = document.querySelectorAll(".palette");
const paletteSearch = document.getElementById("palette-search");

// moodFilter.addEventListener("change", () => {
//   // console.log(moodFilter.value);

//   const selectedMood = moodFilter.value;

//   palettes.forEach((palette) => {
//     const paletteMood = palette.dataset.mood;

//     if (selectedMood === "" || selectedMood === paletteMood) {
//       palette.hidden = false;
//     } else {
//       palette.hidden = true;
//     }
//   });
// });

// paletteSearch.addEventListener("input", () => {
//   console.log(paletteSearch.value);
// });

function filterPalettes() {
    const searchText = paletteSearch.value.toLowerCase().trim();
    const selectedMood = moodFilter.value;
    let visibleCount = 0;

    palettes.forEach((palette) => {
        
        const paletteName = palette.dataset.name;
        const paletteMood = palette.dataset.mood;

        const matchesSearch = paletteName.includes(searchText);
        const matchesMood = selectedMood === "" || selectedMood === paletteMood;

        if (matchesSearch && matchesMood) {
            visibleCount++;
            palette.hidden = false;
        } else {
            palette.hidden = true;
        }
    });

    noResults.hidden = visibleCount > 0;
}

moodFilter.addEventListener("change", filterPalettes);
paletteSearch.addEventListener("input", filterPalettes);
