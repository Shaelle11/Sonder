# Sonder — Short Summary

Sonder is a micro-reflection experience that uses subtle visual language and simple interactions to help users pause and check in with themselves.

Highlights
- Four time-of-day capsules (morning, afternoon, evening, night) with distinct visual tone.
- Mood-driven reflections and gentle self-care prompts.
- Built using only HTML and CSS; no accounts or tracking.

Read the full case study for background, process, and design rationale: [Case Study.md](Case%20Study.md)

and a Sample of some of the designs we've played around with https://stitch.withgoogle.com/projects/10844331319545540294

### Quick start
1. Open `index.html` in your browser to explore the site locally.
2. See time capsule pages in the `pages/` folder.
3. **Our Live Application can be found here** https://sonder-six.vercel.app/ 

Design details
See visual direction and token choices in the design documentation: [Design Documentation.md](Design%20Documentation.md)

Credits
Design & Implementation: 
## Nanji Lakan and Florence Onwuegbuzie
can be found in our google sheets at https://docs.google.com/spreadsheets/d/1BvVfKBTCzat4DLeq2cD9e1ykY8tQ7AD1aZLOSBxs9CI/edit?usp=sharing

---

## Style Guide — CSS variables

A brief reference for the CSS custom properties used across the project. Use these tokens to keep themes and components consistent.

- `--text-color`: Primary readable text color for headlines and body copy in light-themed pages (used for morning/afternoon/evening headings).
- `--primary-cream-color`: Background / surface tone used for cards and sections; varies per theme to convey mood/time.
- `--primary-assets-color`: Accent color for interactive elements (buttons, icons, key accents).
- `--primary-lavender-glow`, `--primary-lavender-dreamy`: Supporting tonal tokens used for subtle backgrounds and link/active states.
- `--font-heading`, `--paragraph-font-size`: Typography tokens for headings and paragraph sizing.
- `--border-radius-card`, `--border-radius-btn`: Geometry tokens for rounded corners on cards and buttons.

Guidelines
- Prefer tokens over hard-coded colors when styling components.
- Use `--hero-color` (set per page) for hero headings so navigation can match H1 color consistently.
- For night theme exceptions, overrides live in `styles/themes.css`; affirmations cards are intentionally made light for readability.

This is a short guide — see `styles/` for concrete implementations and `Design Documentation.md` for visual rationale.
