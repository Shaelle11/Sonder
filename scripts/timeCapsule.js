// Time-based data
const timeData = {
  morning: {
    className: "theme-morning",
    heroText: "Good morning, breath in and get started.",
    affirmations: [
      { img: "../images/flowers.jpg", text: "Take today gently because every small step counts." },
      { img: "../images/orchid.jpg", text: "A calm moment can reset everything." },
      { img: "../images/calm-collage.jpg", text: "You are exactly where you need to be." },
    ],
    checklist: [
      "Drink a glass of water",
      "Stretch or move a little",
      "Listen to a favorite song",
    ]
  },


  afternoon: {
    className: "theme-afternoon",
    heroText: "Good afternoon, don\u2019t forget to take a pause and breathe.",
    affirmations: [
      { img: "../images/seaside.jpg", text: "The sun is high, remember to stay grounded." },
      { img: "../images/tree.jpg", text: "Let the warmth recharge your energy." },
      { img: "../images/plant.jpg", text: "Pause and appreciate how far you\u2019ve come." },
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
      { img: "../images/dusk-over-sea.jpg", text: "As the day ends, remember to be proud of how far you\u2019ve come." },
      { img: "../images/lamp-and-book.jpg", text: "Let go of what you cannot change." },
      { img: "../images/calm-lake.jpg", text: "Prepare your heart for rest." },
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
      { img: "../images/flowers-at-night.jpg", text: "The stars are watching over you." },
      { img: "../images/orchid-at-night.jpg", text: "Let go of today\u2019s heavy thoughts." },
      { img: "../images/night-aesthetic.jpg", text: "Your dreams are a safe space, so ensure to sleep tight." },
    ],
    checklist: [
      "Read a few pages",
      "Set phone to do not disturb",
      "Gratitude list",
    ]
  }
};

function checklistKey(key) { return 'sonder_checklist_' + key; }

function loadItems(key, seedList) {
  const stored = localStorage.getItem(checklistKey(key));
  if (stored) return JSON.parse(stored);
  const items = (seedList || []).map(item =>
    typeof item === 'string'
      ? { text: item, checked: false }
      : { text: item.text, icon: item.icon, checked: false }
  );
  localStorage.setItem(checklistKey(key), JSON.stringify(items));
  return items;
}

function saveItems(key, items) {
  localStorage.setItem(checklistKey(key), JSON.stringify(items));
}

function renderChecklist(key, seedList) {
  const list = document.getElementById('checklist');
  if (!list) return;
  const items = loadItems(key, seedList);
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
      const cur = loadItems(key, seedList);
      cur[i].checked = e.target.checked;
      saveItems(key, cur);
    });
    li.querySelector('.remove-item').addEventListener('click', () => {
      const cur = loadItems(key, seedList);
      cur.splice(i, 1);
      saveItems(key, cur);
      renderChecklist(key, seedList);
    });
    list.appendChild(li);
  });
}

function addItem(key, seedList) {
  const input = document.getElementById('new-item');
  const text = input.value.trim();
  if (!text) return;
  const items = loadItems(key, seedList);
  items.push({ text, checked: false });
  saveItems(key, items);
  input.value = '';
  renderChecklist(key, seedList);
}

function renderTime(time) {
  const data = timeData[time];
  if (!data) return;

  const body = document.body;
  body.classList.remove(
    'theme-morning','theme-afternoon','theme-evening','theme-night',
    'theme-driven','theme-relaxed','theme-anxious','theme-tired'
  );
  body.classList.add(data.className);

  const startAffirm = data.affirmations[Math.floor(Math.random() * data.affirmations.length)];

  const MainContent = document.getElementById("main-content");
  MainContent.innerHTML = `
    <header class="top-header">
         <nav class="affirmation-nav">
        <a href="../index.html" class="logo">Sonder</a>
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
            <h2 class="checklist-header">Checklist</h2>
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
    const  showaffirm= allAffirms[Math.floor(Math.random() * allAffirms.length)];
    document.getElementById('affirm-text').textContent = showaffirm.text;
    document.getElementById('affirm-img').style.backgroundImage = `url('${showaffirm.img}')`;
  }
  document.getElementById('new-affirm-btn').addEventListener('click', showRandomAffirm);
  clearInterval(window._affirmInterval);
  window._affirmInterval = setInterval(showRandomAffirm, 30000);

  // Unified checklist
  renderChecklist(time, data.checklist);
  document.getElementById('add-item-btn').addEventListener('click', () => addItem(time, data.checklist));
  document.getElementById('new-item').addEventListener('keydown', e => {
    if (e.key === 'Enter') addItem(time, data.checklist);
  });

  // Time-rail clicks
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


document.addEventListener("DOMContentLoaded", () => {
  let time = null;

  try {
    if (typeof getActiveTheme === 'function') {
      const active = getActiveTheme();
      if (active && timeData[active]) time = active;
    }
  } catch (e) { /* ignore if theme helper unavailable */ }

  if (!time) time = sessionStorage.getItem('sonder_timeOfDay') || getTimeOfDay();
  if (!timeData[time]) time = getTimeOfDay();
  sessionStorage.setItem('sonder_timeOfDay', time);
  renderTime(time);
});