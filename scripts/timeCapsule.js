// Time-based data
const timeData = {
  morning: {
    className: "theme-morning",
    heroText: "Good morning, breath in and get started.",
    affirmations: [
      { img: "../../images/flowers.jpg", text: "Take today gently because every small step counts." },
      { img: "../../images/orchid.jpg", text: "A calm moment can reset everything." },
      { img: "../../images/calm-collage.jpg", text: "You are exactly where you need to be." },
    ],
    checklist: [
      "Drink a glass of water",
      "Stretch or move a little",
      "Listen to a favorite song",
    ]
  },
 
 
  afternoon: {
    className: "theme-afternoon",
    heroText: "Good afternoon, don't forget to take a pause and breathe.",
    affirmations: [
      { img: "../../images/seaside.jpg", text: "The sun is high, remember to stay grounded." },
      { img: "../../images/tree.jpg", text: "Let the warmth recharge your energy." },
      { img: "../../images/plant.jpg", text: "Pause and appreciate how far you've come." },
    ],
    checklist: [
      "Step outside for fresh air",
      "Digital detox for 10 mins",
      "Enjoy a hydrating herbal tea",
    ]
  },
 
 
  evening: {
    className: "theme-evening",
    heroText: "Good evening, take a moment to unwind and reflect.",
    affirmations: [
      { img: "../../images/dusk-over-sea.jpg", text: "As the day ends, remember to be proud of how far you've come." },
      { img: "../../images/lamp-and-book.jpg", text: "Let go of what you cannot change." },
      { img: "../../images/calm-lake.jpg", text: "Prepare your heart for rest." },
    ],
    checklist: [
      "Dim the lights",
      "Reflect on one win today",
      "Prepare sleep environment",
    ]
  },
 
 
  night: {
    className: "theme-night",
    heroText: "Goodnight, sleep well and be kind to yourself.",
    affirmations: [
      { img: "../../images/flowers-at-night.jpg", text: "The stars are watching over you." },
      { img: "../../images/orchid-at-night.jpg", text: "Let go of today's heavy thoughts." },
      { img: "../../images/night-aesthetic.jpg", text: "Your dreams are a safe space, so ensure to sleep tight." },
    ],
    checklist: [
      "Read a few pages",
      "Set phone to do not disturb",
      "Gratitude list",
    ]
  }
};


function renderTime(time) {
  const data = timeData[time];
  if (!data) return;

  // Set body class
  document.body.className = data.className;

  // Render HTML
  const MainContent = document.getElementById("main-content");
  MainContent.innerHTML = `
    <header class="top-header">
         <nav><a href="../../index.html" class="logo">Sonder</a></nav>
         <label for="time-toggle" class="nav-rail-toggle" aria-controls="time-rail" aria-expanded="true">
            <i class="ph-bold ph-clock" aria-hidden="true"></i>
          </label>
    </header>

    <main>
        <input type="checkbox" id="time-toggle" checked hidden>
        <aside class="nav-items nav-rail" aria-label="time-rail">
             ${Object.keys(timeData).map(t => `
               <a href="#" data-time="${t}" ${t === time ? 'aria-current="page"' : ''}>
               <i class="ph-bold ${
              t === 'morning' ? 'ph-sun' :
              t === 'afternoon' ? 'ph-sun-horizon' :
              t === 'evening' ? 'ph-moon' : 'ph-moon-stars'
              }"></i>
              </a>
        `).join('')}
       </aside>
      <section class="content">
        <section class="mood-section">
          <h1 class="hero-header">${data.heroText}</h1>

          <section class="affirmation-cards-section" aria-label="affirmation-cards">
           <ul class="affirmation-cards-container">
                  ${data.affirmations.map(a => `
                    <li><article class="affirmation-card">
                    <img class="affirmation-card-image" src="${a.img}" alt="">
                    <p>${a.text}</p>
                    </article></li>
              `).join('')}
            </ul>
          </section>

          <section class="checklist-section" aria-label="checklist">
            <h2 class="checklist-header">Checklist</h2>
            <ul class="checklist">
              ${data.checklist.map(item => `<li><label class="checklist-option"><input type="checkbox"> ${item}</label></li>`).join('')}
            </ul>
          </section>
        </section>
      </section>
    </main>

  `;


   // Attach time-rail clicks
 document.querySelectorAll(".nav-items a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      renderTime(link.dataset.time);
    });
  });
}

 
 
 

// Detect user's device time of day
function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 21) return 'evening';
  return 'night';
}

// On load: use time stored by auth pages, or fall back to device time
document.addEventListener("DOMContentLoaded", () => {
  let time = sessionStorage.getItem('sonder_timeOfDay') || getTimeOfDay();
  if (!timeData[time]) time = getTimeOfDay();
  sessionStorage.setItem('sonder_timeOfDay', time);
  renderTime(time);
});