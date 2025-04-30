
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
let darkMode = false;

themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    themeIcon.src = darkMode ? 'https://i.pinimg.com/736x/66/71/3a/66713a96b9b21dffd3a85a5d748a3171.jpg' : 'https://i.pinimg.com/736x/ac/58/ea/ac58ea5f8c7a2a3d707201e3352874f9.jpg'; 
});
