let darkBtn = document.getElementById("dark-mode-button");
let toggleBtn = document.getElementById('change-mode-button');
let coolBtn = document.getElementById("cool-mode-button");
let theme = document.getElementById("theme");
let darkMode = localStorage.getItem("dark-mode");
let coolMode = localStorage.getItem("cool-mode");
let toggleMode = localStorage.getItem("toggle-mode");

document.getElementById("dark-mode-button").hidden = true;
document.getElementById("cool-mode-button").hidden = true;
document.getElementById("change-mode-button").hidden = false;

if (darkMode === "enabled") {
  theme.classList.remove("cool-mode-theme");
    localStorage.setItem("cool-mode", "disabled");
  theme.classList.add("dark-mode-theme");
  localStorage.setItem("dark-mode", "enabled");
}

if (coolMode === "enabled") {
  theme.classList.remove("dark-mode-theme");
    localStorage.setItem("dark-mode", "disabled");
  theme.classList.add("cool-mode-theme");
  localStorage.setItem("cool-mode", "enabled");
}

if (toggleMode === "enabled") {
  document.getElementById("dark-mode-button").hidden = false;
  document.getElementById("cool-mode-button").hidden = false; 
  localStorage.setItem("toggle-mode", "enabled");
}



toggleBtn.addEventListener("click", (e) => {
  console.log("too")
  toggleMode = localStorage.getItem("toggle-mode"); 
  if (toggleMode === "disabled") {
    document.getElementById("dark-mode-button").hidden = false;
    document.getElementById("cool-mode-button").hidden = false; 
    localStorage.setItem("toggle-mode", "enabled");
  } else {
    document.getElementById("dark-mode-button").hidden = true;
    document.getElementById("cool-mode-button").hidden = true;
    localStorage.setItem("toggle-mode", "disabled"); 
  }
  
});


darkBtn.addEventListener("click", (e) => {
  darkMode = localStorage.getItem("dark-mode"); 
  if (darkMode === "disabled") {
    theme.classList.remove("cool-mode-theme");
    localStorage.setItem("cool-mode", "disabled");
    theme.classList.add("dark-mode-theme");
    localStorage.setItem("dark-mode", "enabled");
  } else {
    theme.classList.remove("dark-mode-theme");
    localStorage.setItem("dark-mode", "disabled");
  }
});

coolBtn.addEventListener("click", (e) => {
  coolMode = localStorage.getItem("cool-mode"); 
  if (coolMode === "disabled") {
    theme.classList.remove("dark-mode-theme");
    localStorage.setItem("dark-mode", "disabled");
    theme.classList.add("cool-mode-theme");
    localStorage.setItem("cool-mode", "enabled");
  } else {
    theme.classList.remove("cool-mode-theme");
    localStorage.setItem("cool-mode", "disabled");
  }
});




