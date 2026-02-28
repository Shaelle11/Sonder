const affirmations = [
  "You are allowed to rest.",
  "Slowness is not failure.",
  "You are still becoming.",
  "This moment does not define you.",
  "Even tired hearts are strong."
];


//  TIME-BASED DEFAULT THEME

function GetTime () {
    const hour = new Date().getHours();
    let TimeTheme = "";

    if( hour >= 5 && hour <12){
        TimeTheme = "morning";
    }
    else if(hour >= 12 && hour < 14){
        TimeTheme = "afternoon";
    }
    else if(hour >= 14 && hour < 18){
        TimeTheme = "evening";
    }
    else {
        TimeTheme = "night";
    }
    return TimeTheme;
}


//  MOOD-BASED THEMES
const MOOD_KEY = "sonder-mood";




function getActiveTheme() {
  // Always determine an active theme: mood overrides time-of-day.
  const savedMood = localStorage.getItem(MOOD_KEY);
  if (savedMood) return savedMood;
  return GetTime();
}




  // APPLY THEME
function applyTheme(TimeTheme) {
  const body = document.body;

  body.classList.remove(
    "theme-morning",
    "theme-afternoon",
    "theme-evening",
    "theme-night",
    "theme-driven",
    "theme-relaxed",
    "theme-anxious",
    "theme-tired"
  );

  body.classList.add(`theme-${TimeTheme}`);

  applyBackgroundEffect(TimeTheme);
}




  // FETCH THEME ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  const activeTheme = getActiveTheme();  
  applyTheme(activeTheme);
});




//ASSIGN SAME DATA ATTRIBUTE TO MOOD BUTTONS, TO GET MOOD-VALUE ON CLICK
document.querySelectorAll("[data-mood]").forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;

    localStorage.setItem(MOOD_KEY, mood);
    applyTheme(mood);
  });
});









const themeEffects = {
  morning: "bees",
  afternoon: "petals",
  evening: "dandelions",
  night: "fireflies",
  default: "bubbles"
};


function applyBackgroundEffect(TimeTheme) {
  const backgroundLayer = document.getElementById("background-layer");
  const rainLayer = document.getElementById("rain-glass-layer");

  backgroundLayer.innerHTML = "";
  rainLayer.innerHTML = "";

  if (TimeTheme === "tired") {
    generateRain();
  } else {
    generateParticles(TimeTheme);
  }
}



applyBackgroundEffect("default");

function generateParticles(type) {
  const layer = document.getElementById("background-layer");

  for (let i = 0; i < 10; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle", type);

    particle.dataset.affirmation = getRandomAffirmation();

    particle.style.left = Math.random() * 100 + "vw";
    particle.style.animationDelay = Math.random() * 10 + "s";

    particle.addEventListener("click", revealAffirmation);

    layer.appendChild(particle);
  }
}


function getRandomAffirmation() {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}

function revealAffirmation(e) {
  const particle = e.target;
  const message = particle.dataset.affirmation;

  particle.classList.add("pop");

  showAffirmationText(message);

  setTimeout(() => {
    particle.remove();
  }, 300);
}

function showAffirmationText(text) {
  const popup = document.getElementById("affirmation-popup");

  popup.textContent = text;
  popup.style.opacity = "1";

  setTimeout(() => {
    popup.style.opacity = "0";
  }, 4000);
}
