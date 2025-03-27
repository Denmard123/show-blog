function applyTheme() {
    const html = document.documentElement;
    let theme = localStorage.getItem('theme');

    if (!theme) {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }

    html.classList.toggle('dark', theme === 'dark');
    updateThemeIcon();
}

function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
        const newIcon = document.documentElement.classList.contains("dark") ? "sun" : "moon";
        if (themeIcon.getAttribute("data-lucide") !== newIcon) {
            themeIcon.setAttribute("data-lucide", newIcon);
            lucide.createIcons();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();

    const toggleButton = document.getElementById("theme-toggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleDarkMode);
    }

    lucide.createIcons();
});
