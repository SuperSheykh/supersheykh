export const themeScript = `
(function() {
  try {
    var key = "supersheykh-ui-theme";
    var theme = localStorage.getItem(key);
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var appliedTheme = "light";

    if (theme === "dark" || (!theme && prefersDark)) {
      appliedTheme = "dark";
    } else if (theme === "system") {
      appliedTheme = prefersDark ? "dark" : "light";
    }

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(appliedTheme);
  } catch (_) {}
})();
`;
