
const moodData = {
  anxious: {
    className: "theme-anxious",
    heroText: "It\u2019s okay to pause and breathe.",
    affirmations: [
      { img: "../images/anxiety-beautiful-bicolor-plant-details.jpg", text: "You are allowed to feel what you\u2019re feeling." },
      { img: "../images/anxiety-relax-written-sand.jpg", text: "This moment will pass \u2014 breathe with it." },
      { img: "../images/anxiety-many-drops-water-falling-leaves.jpg", text: "You are grounding yourself with every breath." },
    ],
    checklist: [
      { text: "Try the 5-4-3-2-1 grounding exercise", icon: "ph-head-circuit" },
      { text: "Place both feet on the floor and notice sensation", icon: "ph-person-simple-tai-chi" },
      { text: "Exhale slowly for a count longer than inhale", icon: "ph-breath" },
    ],
  },


  driven: {
    className: "theme-driven",
    heroText: "Let\u2019s move with purpose today.",
    affirmations: [
      { img: "../images/driven-side-view-smiley-girl-seaside.jpg", text: "You have the power to create progress today." },
      { img: "../images/driven-fresh-green-tree-blue-sky.jpg", text: "Today is a fresh chance, no pressure attached." },
      { img: "../images/driven-beautiful-bicolor-plant-details.jpg", text: "You can protect your energy today." },
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
      { img: "../images/relaxing-beautiful-flowers-seen-humidity-glass.jpg", text: "The open sky reminds you there is space to relax." },
      { img: "../images/relaxing-orchid-stones-towel.jpg", text: "Rest is part of being productive." },
      { img: "../images/relaxing-weather-effects-collage-concept.jpg", text: "You deserve rest without explanation." },
    ],
    checklist: [
      { text: "Step outside for fresh air", icon: "ph-butterfly" },
      { text: "Digital detox for 10 mins", icon: "ph-monitor-play" },
      { text: "Enjoy a hydrating herbal tea", icon: "ph-coffee" },
    ],
  },


  tired: {
    className: "theme-tired",
    heroText: "It\u2019s okay to start slow.",
    affirmations: [
      { img: "../images/tired-sad-contemplative-person-near-lake.jpg", text: "You are worthy of patience, especially from yourself." },
      { img: "../images/tired-long-exposure-rock-formations-sea-sunset.jpg", text: "You are not behind; you are on your own path." },
      { img: "../images/tired-single-chair-reflecting-water-surface-stormy-day.jpg", text: "You can start again, as many times as you need." },
    ],
    checklist: [
      { text: "Take a deep breath", icon: "ph-head-circuit" },
      { text: "Listen to your favorite song", icon: "ph-music-notes-simple" },
      { text: "Stretch or move a little", icon: "ph-person-simple-tai-chi" },
    ],
  },
};



// Checklist
function checklistKey(mood) { return 'sonder_checklist_' + mood; }

function loadItems(mood) {
  const stored = localStorage.getItem(checklistKey(mood));
  if (stored) return JSON.parse(stored);
  const seed = (moodData[mood] || {}).checklist || [];
  const items = seed.map(c => ({ text: c.text, icon: c.icon, checked: false }));
  localStorage.setItem(checklistKey(mood), JSON.stringify(items));
  return items;
}

function saveItems(mood, items) {
  localStorage.setItem(checklistKey(mood), JSON.stringify(items));
}

function renderChecklist(mood) {
  const list = document.getElementById('checklist');
  if (!list) return;
  const items = loadItems(mood);
  list.innerHTML = '';
  items.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <label class="checklist-option">
        <input type="checkbox" ${item.checked ? 'checked' : ''}>
        ${item.text}
        ${item.icon ? `<span aria-hidden="true"><i class="ph-bold ${item.icon}"></i></span>` : ''}
      </label>
      <button class="remove-item" aria-label="Remove item" data-index="${i}">
        <i class="ph-bold ph-x"></i>
      </button>`;
    li.querySelector('input').addEventListener('change', e => {
      const cur = loadItems(mood);
      cur[i].checked = e.target.checked;
      saveItems(mood, cur);
    });
    li.querySelector('.remove-item').addEventListener('click', () => {
      const cur = loadItems(mood);
      cur.splice(i, 1);
      saveItems(mood, cur);
      renderChecklist(mood);
    });
    list.appendChild(li);
  });
}

function addItem(mood) {
  const input = document.getElementById('new-item');
  const text = input.value.trim();
  if (!text) return;
  const items = loadItems(mood);
  items.push({ text, checked: false });
  saveItems(mood, items);
  input.value = '';
  renderChecklist(mood);
}

//  Render 
function renderMood(selectedMood) {
  const data = moodData[selectedMood];
  if (!data) return;

  document.body.className = data.className;

  const startAffirm = data.affirmations[Math.floor(Math.random() * data.affirmations.length)];

  const MainContent = document.getElementById("main-content");
  MainContent.innerHTML = `
    <header class="top-header">
      <nav class="affirmation-nav">
        <a href="../index.html" class="logo">Sonder</a>
        <a href="timeCapsule.html" class="time-switch"> 
             <i class="ph-bold ph-clock" aria-hidden="true"></i>
        </a>
      </nav>
    </header>

    <main>
      
      <section class="content">
        <section class="mood-section">
          <h1 class="hero-header">${data.heroText}</h1>

          <article class="affirmation-card floating-card">
            <div class="image-overlay" id="affirm-img"
                 style="background-image: url('${startAffirm.img}');"></div>
            <p id="affirm-text">${startAffirm.text}</p>
            <button class="affirm-btn" id="new-affirm-btn">New Affirmation</button>
          </article>

          <section class="checklist-section">
            <h2 class="checklist-header">
              Checklist <span><i class="ph-bold ph-hand-heart"></i></span>
            </h2>
            <div class="add-item-row">
              <input type="text" id="new-item"
                     placeholder="Add a self-care step…"
                     aria-label="New checklist item" />
              <button id="add-item-btn" aria-label="Add item">
                <i class="ph-bold ph-plus"></i>
              </button>
            </div>
            <ul class="checklist" id="checklist"></ul>
          </section>
        </section>
      </section>
    </main>
  `;

  // Affirmation cycling
  const allAffirms = data.affirmations;
  function showRandomAffirm() {
    const r = allAffirms[Math.floor(Math.random() * allAffirms.length)];
    document.getElementById('affirm-text').textContent = r.text;
    document.getElementById('affirm-img').style.backgroundImage = `url('${r.img}')`;
  }
  document.getElementById('new-affirm-btn').addEventListener('click', showRandomAffirm);
  clearInterval(window._affirmInterval);
  window._affirmInterval = setInterval(showRandomAffirm, 30000);

  // Checklist
  renderChecklist(selectedMood);
  document.getElementById('add-item-btn').addEventListener('click', () => addItem(selectedMood));
  document.getElementById('new-item').addEventListener('keydown', e => {
    if (e.key === 'Enter') addItem(selectedMood);
  });
}

// ── On load ───────────────────────────────────────────────────────────────────
(function () {
  const mood = new URLSearchParams(window.location.search).get('mood');
  if (mood && moodData[mood]) renderMood(mood);
})();