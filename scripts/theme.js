const affirmations = {
  default: [
    "You are allowed to rest.",
    "Slowness is not failure.",
    "You are still becoming.",
    "This moment does not define you.",
    "Even tired hearts are strong."
  ],
  morning: ["You are capable today.", "Move gently, but move."],
  afternoon: ["Small focus, big results.", "Pause to breathe."],
  evening: ["You did enough for today.", "Warmth finds you."],
  night: ["You survived today.", "Rest is allowed."],
  relaxed: ["You are safe here.", "Softness is allowed."],
  driven: ["One step at a time.", "Keep steady momentum."],
  anxious: ["This feeling will pass.", "Notice the body, soften."],
  tired: ["It's okay to rest.", "Soft naps help."],
};

function GetTime () {
    const hour = new Date().getHours();
    let TimeTheme = "";

    if( hour >= 5 && hour <12){
        TimeTheme = "theme-morning";
    }
    else if(hour >= 12 && hour < 14){
        TimeTheme = "theme-afternoon";
    }
    else if(hour >= 14 && hour < 18){
        TimeTheme = "theme-evening";
    }
  else if (hour >= 18 || hour < 5) {
    TimeTheme = "theme-night";
  }
  return TimeTheme;
}

function applyTheme(TimeTheme) {
    const body = document.body;


body.classList.remove("theme-morning", "theme-afternoon", "theme-evening", "theme-night", "theme-driven", "theme-relaxed", "theme-anxious", "theme-tired");

body.classList.add(TimeTheme);
  // localStorage.setItem("sonder-theme", TimeTheme);
}

document.addEventListener("DOMContentLoaded", () => {
    const detectedTheme = GetTime();
    if (detectedTheme) applyTheme(detectedTheme);

    const effectKey = detectedTheme && detectedTheme.startsWith && detectedTheme.startsWith("theme-")
      ? detectedTheme.replace("theme-", "")
      : (detectedTheme || "default");
    applyBackgroundEffect(effectKey);

    // watch for theme class changes on <body> and update effects dynamically
    const body = document.body;
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === 'class') {
          const cls = Array.from(body.classList).find(c => c.startsWith('theme-'));
          const key = cls ? cls.replace('theme-', '') : (detectedTheme && detectedTheme.replace('theme-', '')) || 'default';
          applyBackgroundEffect(key);
        }
      }
    });
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });

});

const themeEffects = {
  morning: "bees",
  afternoon: "petals",
  evening: "dandelions",
  night: "fireflies",
  default: "bubbles"
};
function applyBackgroundEffect(TimeTheme) {
  // ensure we have the effects container and clean previous effects
  ensureBackgroundEffectsContainer();
  clearBackgroundEffects();

  // normalize key: accept `theme-night` or `night`
  let key = TimeTheme || "default";
  if (key && key.startsWith && key.startsWith("theme-")) {
    key = key.replace("theme-", "");
  }

  if (key === "tired") {
    // tired uses rain overlay
    generateRain();
    startEffectManager(null); // ensure no particle manager is running
  } else {
    startEffectManager(key);
  }
}

function ensureBackgroundEffectsContainer() {
  if (!document.getElementById('background-effects')) {
    const div = document.createElement('div');
    div.id = 'background-effects';
    div.setAttribute('aria-hidden', 'true');
    div.style.position = 'fixed';
    div.style.inset = '0';
    div.style.zIndex = '-1';
    div.style.overflow = 'hidden';
    div.style.pointerEvents = 'none';
    document.body.appendChild(div);
  }
}

function clearBackgroundEffects() {
  const effects = document.getElementById('background-effects');
  const rain = document.getElementById('rain-glass-layer');
  const bg = document.getElementById('background-layer');
  if (effects) effects.innerHTML = '';
  if (rain) rain.innerHTML = '';
  if (bg) bg.innerHTML = '';
  // stop any running manager
  startEffectManager(null);
}

// Effect manager: starts periodic spawning for a given effect key.
let _effectInterval = null;
let _currentEffectKey = null;
function startEffectManager(key) {
  // if null, stop manager
  if (!key) {
    if (_effectInterval) {
      clearInterval(_effectInterval);
      _effectInterval = null;
    }
    _currentEffectKey = null;
    return;
  }
  // already running same key
  if (_currentEffectKey === key && _effectInterval) return;

  // stop previous
  if (_effectInterval) {
    clearInterval(_effectInterval);
    _effectInterval = null;
  }

  _currentEffectKey = key;

  // initial spawn
  const baseCount = Math.max(6, Math.min(18, Math.floor(window.innerWidth / 120)));
  const initial = Math.floor(baseCount * 0.9);
  generateParticles(key, initial);

  // determine spawn rate reduced on small screens
  const isMobile = window.innerWidth <= 768;
  const spawnEvery = isMobile ? 9000 : 6000;
  const spawnBatch = isMobile ? Math.max(1, Math.floor(baseCount / 10)) : Math.max(1, Math.floor(baseCount / 6));

  _effectInterval = setInterval(() => {
    // add a few particles periodically
    generateParticles(key, spawnBatch);
    // keep total particles bounded
    enforceParticleLimit(Math.max(8, baseCount * 2));
  }, spawnEvery);
}

function enforceParticleLimit(maxCount) {
  const container = document.getElementById('background-effects') || document.getElementById('background-layer');
  if (!container) return;
  const particles = container.querySelectorAll('.particle');
  if (particles.length <= maxCount) return;
  const removeCount = particles.length - maxCount;
  for (let i = 0; i < removeCount; i++) {
    const p = particles[i];
    if (p && p.remove) p.remove();
  }
}


function generateParticles(type) {
  const layer = document.getElementById('background-effects') || document.getElementById('background-layer');
  if (!layer) return;

  const count = Math.max(6, Math.min(18, Math.floor(window.innerWidth / 120)));

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle', type);
    particle.dataset.theme = type;

    particle.dataset.affirmation = getRandomAffirmation(type);

    const size = (8 + Math.random() * 28).toFixed(0) + 'px';
    particle.style.width = size;
    particle.style.height = size;
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.opacity = (0.35 + Math.random() * 0.6).toFixed(2);
    particle.style.animationDelay = (Math.random() * 8).toFixed(2) + 's';
    particle.style.pointerEvents = 'auto';

    particle.addEventListener('click', revealAffirmation);

    layer.appendChild(particle);
  }
}


function generateRain() {
  const layer = document.getElementById("rain-glass-layer");
  if (!layer) return;

  for (let i = 0; i < 14; i++) {
    const drop = document.createElement("div");
    drop.classList.add("raindrop");
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDelay = (Math.random() * 2).toFixed(2) + "s";
    layer.appendChild(drop);
  }
}


function getRandomAffirmation(theme) {
  const pool = (theme && affirmations[theme]) || affirmations.default;
  return pool[Math.floor(Math.random() * pool.length)];
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
