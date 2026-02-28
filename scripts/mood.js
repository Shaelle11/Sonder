
const moodData = {
  anxious: {
    className: "theme-anxious",
    heroText: "It's okay to pause and breathe.",
    affirmations: [
      { img: "../../images/anxiety-beautiful-bicolor-plant-details.jpg", text: "You are allowed to feel what you're feeling." },
      { img: "../../images/anxiety-relax-written-sand.jpg", text: "This moment will pass — breathe with it." },
      { img: "../../images/anxiety-many-drops-water-falling-leaves.jpg", text: "You are grounding yourself with every breath." },
    ],
    checklist: [
      { text: "Try the 5-4-3-2-1 grounding exercise", icon: "ph-head-circuit" },
      { text: "Place both feet on the floor and notice sensation", icon: "ph-person-simple-tai-chi" },
      { text: "Exhale slowly for a count longer than inhale", icon: "ph-breath" },
    ],
  },


  driven: {
    className: "theme-driven",
    heroText: "Let's move with purpose today.",
    affirmations: [
      { img: "../../images/driven-side-view-smiley-girl-seaside.jpg", text: "You have the power to create progress today." },
      { img: "../../images/driven-fresh-green-tree-blue-sky.jpg", text: "Today is a fresh chance, no pressure attached." },
      { img: "../../images/driven-beautiful-bicolor-plant-details.jpg", text: "You can protect your energy today." },
    ],
    checklist: [
      { text: "Identify your top priority", icon: "ph-arrow-line-up" },
      { text: "Deep work for 25 mins", icon: "ph-alarm" },
      { text: "Visualize your success", icon: "ph-calendar-check" },
    ],
  },


  relaxed: {
    className: "theme-relaxed",
    heroText: "Taking a moment for yourself?",
    affirmations: [
      { img: "../../images/relaxing-beautiful-flowers-seen-humidity-glass.jpg", text: "The open sky reminds you there is space to relax." },
      { img: "../../images/relaxing-orchid-stones-towel.jpg", text: "Rest is part of being productive." },
      { img: "../../images/relaxing-weather-effects-collage-concept.jpg", text: "You deserve rest without explanation." },
    ],
    checklist: [
      { text: "Step outside for fresh air", icon: "ph-butterfly" },
      { text: "Digital detox for 10 mins", icon: "ph-monitor-play" },
      { text: "Enjoy a hydrating herbal tea", icon: "ph-coffee" },
    ],
  },


  tired: {
    className: "theme-tired",
    heroText: "It's okay to start slow.",
    affirmations: [
      { img: "../../images/tired-sad-contemplative-person-near-lake.jpg", text: "You are worthy of patience, especially from yourself." },
      { img: "../../images/tired-long-exposure-rock-formations-sea-sunset.jpg", text: "You are not behind; you are on your own path." },
      { img: "../../images/tired-single-chair-reflecting-water-surface-stormy-day.jpg", text: "You can start again, as many times as you need." },
    ],
    checklist: [
      { text: "Take a deep breath", icon: "ph-head-circuit" },
      { text: "Listen to your favorite song", icon: "ph-music-notes-simple" },
      { text: "Stretch or move a little", icon: "ph-person-simple-tai-chi" },
    ],
  },
};



function renderMood(selectedMood) {
  const data = moodData[selectedMood];
  if (!data) return;

  // Set body class
  document.body.className = data.className;

  // Build HTML
  const MainContent= document.getElementById("main-content");
  MainContent.innerHTML = `
    <header class="top-header">
            <nav><a href="../../index.html" class="logo">Sonder</a></nav>
            <label for="time-toggle" class="nav-rail-toggle" aria-controls="time-rail" aria-expanded="true">
               <i class="ph-bold ph-clock" aria-hidden="true"></i>
           </label>
    </header>
    
    <main>
      <input type="checkbox" id="time-toggle" checked hidden>
      <aside id="time-rail" class="nav-items nav-rail" aria-label="time-rail">
        <a href="../timeCapsule.html" aria-label="Morning"><i class="ph-bold ph-sun" aria-hidden="true"></i></a>
        <a href="../timeCapsule.html" aria-label="Afternoon"><i class="ph-bold ph-sun-horizon" aria-hidden="true"></i></a>
        <a href="../timeCapsule.html" aria-label="Evening"><i class="ph-bold ph-moon" aria-hidden="true"></i></a>
        <a href="../timeCapsule.html" aria-label="Night"><i class="ph-bold ph-moon-stars" aria-hidden="true"></i></a>
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
                `).join("")}
            </ul>
          </section>

          <section class="checklist-section" aria-label="checklist">
            <h2 class="checklist-header">Checklist <span><i class="ph-bold ph-hand-heart"></i></span></h2>
            <ul class="checklist">
                ${data.checklist.map(c => `
                 <li><label class="checklist-option">
                     <input type="checkbox"> ${c.text}
                     <span aria-hidden="true"><i class="ph-bold ${c.icon}"></i></span>
                 </label></li>
              `).join("")}
            </ul>
          </section>
        </section>
      </section>
    </main>  
  `;
}


document.querySelectorAll(".footer-navigation a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    renderMood(link.dataset.mood);
  });
});

(function () {
  const params = new URLSearchParams(window.location.search);
  const mood = params.get('mood');
  if (mood && moodData[mood]) {
    renderMood(mood);
  }
})();