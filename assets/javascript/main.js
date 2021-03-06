if (localStorage.getItem("colorScheme") === "dark") {
  document.querySelector("#dark-css").removeAttribute("media"); // Set dark theme
}
else if (localStorage.getItem("colorScheme") === "light") {
  document.querySelector("#dark-css").setAttribute("media", "invalid"); // Set light theme
}

// Dark/Light color scheme switch button
function changeColorScheme() {
  // Use whatever users want
  if (localStorage.getItem("colorScheme") === "dark") {
    // Change to light theme
    if (window.matchMedia("(prefers-color-scheme: dark)").matches === false) {
      document.querySelector("#dark-css").setAttribute("media", "(prefers-color-scheme: dark)");
      localStorage.removeItem("colorScheme");
    } else {
      // by setting invalid media it will just not apply CSS for anyone
      document.querySelector("#dark-css").setAttribute("media", "invalid");
      localStorage.setItem("colorScheme", "light");
    }
  }
  // Change to dark theme
  else if (localStorage.getItem("colorScheme") === "light") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches === true) {
      document.querySelector("#dark-css").setAttribute("media", "(prefers-color-scheme: dark)");
      localStorage.removeItem("colorScheme");
    } else {
      // media was set to prefers-color-scheme: dark
      document.querySelector("#dark-css").removeAttribute("media");
      localStorage.setItem("colorScheme", "dark");
    }
  }

  // Just use whatever browsers want
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches === true) {
    // Change to light Theme
    document.querySelector("#dark-css").setAttribute("media", "invalid");
    localStorage.setItem("colorScheme", "light");
  } else {
    // Change to dark theme
    document.querySelector("#dark-css").removeAttribute("media");
    localStorage.setItem("colorScheme", "dark");
  }
  fixThemeImages();
}

function handleBtnKeyDown(event) {
  // Check to see if space or enter were pressed
  if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") { // "Spacebar" for IE11 support
    // Prevent the default action to stop scrolling when space is pressed
    event.preventDefault();
    changeColorScheme();
  }
}

// Fix images in dark theme
function fixThemeImages() {
  document.querySelectorAll('[data-theme-src]').forEach(function (image) {
    tempSrc = image.src;
    image.src = image.getAttribute("data-theme-src");
    image.setAttribute("data-theme-src", tempSrc);
  });
}
if (
  (localStorage.getItem("colorScheme") === "dark") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ^
    localStorage.getItem("colorScheme") === "light")
) {
  fixThemeImages();
}