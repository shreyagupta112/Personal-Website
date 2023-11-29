let darkBtn = document.getElementById("dark-mode-button");
let toggleBtn = document.getElementById('change-mode-button');
let theme = document.getElementById("theme");
let darkMode = localStorage.getItem("dark-mode");
let toggleMode = localStorage.getItem("toggle-mode");
console.log("here")


document.getElementById("change-mode-button").hidden = false;

if (darkMode === "enabled") {
  theme.classList.add("dark-mode-theme");
  localStorage.setItem("dark-mode", "enabled");
}

if (toggleMode === "enabled") {
  document.getElementById("dark-mode-button").hidden = true;
  document.getElementById("cool-mode-button").hidden = true; 
  localStorage.setItem("toggle-mode", "enabled");
}



toggleBtn.addEventListener("click", (e) => {
  console.log("too")
  toggleMode = localStorage.getItem("toggle-mode"); 
  if (toggleMode === "disabled") {
    document.getElementById("dark-mode-button").hidden = true;
    document.getElementById("cool-mode-button").hidden = true; 
    localStorage.setItem("toggle-mode", "enabled");
  } else {
    document.getElementById("dark-mode-button").hidden = false;
    document.getElementById("cool-mode-button").hidden = false;
    localStorage.setItem("toggle-mode", "disabled"); 
  }
  
});


darkBtn.addEventListener("click", (e) => {
  darkMode = localStorage.getItem("dark-mode"); 
  if (darkMode === "disabled") {
    theme.classList.add("dark-mode-theme");
    localStorage.setItem("dark-mode", "enabled");
  } else {
    theme.classList.remove("dark-mode-theme");
    localStorage.setItem("dark-mode", "disabled");
  }
});



