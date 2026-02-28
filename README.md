# Sonder — Short Summary

Sonder is a micro-reflection experience that uses subtle visual language and simple interactions to help users pause and check in with themselves.

Highlights
- Four time-of-day capsules (morning, afternoon, evening, night) with distinct visual tone.
- Mood-driven reflections and gentle self-care prompts.
- Built using only HTML and CSS; no accounts or tracking.

  # CASE STUDY

Read the full case study for background, process, and design rationale: 
- [Case Study.md](Case%20Study.md)
- Case study by Nanji Lakan - https://medium.com/@Youtenstudio/sonder-8c10e8b65073
- Case study by Florence Onwuegbuzie - https://medium.com/@florenceworkhub/designing-a-self-love-website-building-sonder-c1aad49c9240

and a Sample of some of the designs we've played around with https://stitch.withgoogle.com/projects/10844331319545540294

### Quick start
1. Open `index.html` in your browser to explore the site locally.
2. See time capsule pages in the `pages/` folder.
3. **Our Live Application** [Sonder](https://sonder-six.vercel.app/)
4. **Our Presentation Link** [Presentation](https://www.canva.com/design/DAHBL6M8PQs/x7bQSQbTnUZRejHL0G8iKw/edit?utm_content=DAHBL6M8PQs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

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
- For night theme exceptions, overrides live in `styles/themes.css`; affirmations cards, headings and nav are intentionally made light for readability.

This is a short guide — see `styles/` for concrete implementations and `Design Documentation.md` for visual rationale.

## JavaScript Implementation & Logic Flow

This section documents the lightweight client-side JavaScript added as progressive enhancement: how state is stored, how pages decide what to render, and how data moves through the app.

- Files and responsibilities
	- `scripts/theme.js`: decides and applies the active theme (mood or time), manages background effects, and exposes the small theme API (`getActiveTheme()`, `applyTheme()`).
	- `scripts/timeCapsule.js`: determines which time capsule to render (prefers theme, then session, then device time), injects the time-specific UI, starts affirmation cycling, and manages the checklist UI.
	- `scripts/mood.js`: reads the mood selection (URL `?mood=` or button), renders mood-specific content, and shares the same checklist persistence helpers as the time capsule.
	- `pages/auth/signin.html` and `pages/auth/signup.html`: write the user's chosen or detected time into `sessionStorage` to influence the first time-capsule view.

- Storage keys (what is persisted and where)
	- sessionStorage
		- `sonder_timeOfDay` — ephemeral preference for which time capsule to show this session.
		- `sonder_useTimeThemes` — one-time, session-scoped opt-in for applying site-wide time/mood themes.
	- localStorage
		- `sonder-mood` — persisted mood choice; mood overrides time for theming.
		- `sonder_checklist_<key>` — per-key checklist storage (key is a time-of-day or mood string). This stores the checklist items and their checked states.

- Runtime flow (high level)
	1. On any page load `scripts/theme.js` runs and asks the user (once per session) whether they want site-wide time/mood theming. If accepted it computes the active theme via `getActiveTheme()` and applies it with `applyTheme()` (which sets body classes and populates `#background-layer`).
	2. On the Time Capsule page `scripts/timeCapsule.js` resolves the time key with this preference order: theme (if available) → `sessionStorage.sonder_timeOfDay` → device clock. It then sets `sessionStorage.sonder_timeOfDay` and calls `renderTime(key)`.
	3. `renderTime(key)` injects the page HTML into `#main-content`, applies the theme class (non-destructively), starts the affirmation interval, binds the time-rail navigation, and loads the checklist from `localStorage` (using `sonder_checklist_<key>`).
	4. On the Mood page `scripts/mood.js` reads the `?mood=` parameter (or saved `sonder-mood`) and mirrors the same rendering and checklist persistence pattern.
	5. Interactions that mutate state:
		 - Adding/removing/checking checklist items updates the appropriate `sonder_checklist_<key>` entry in `localStorage`.
		 - Selecting a mood button writes `sonder-mood` to `localStorage` and calls `applyTheme()` to immediately update theming.
		 - Auth pages may seed `sonder_timeOfDay` so navigations that follow show the user's detected time choice.

- Notes and rationale
	- Storage is local-only (sessionStorage/localStorage) to preserve privacy and keep the site fully static and hostable on static platforms.
	- The theme application is designed to be non-destructive: the code removes only known theme classes and then adds the active theme class so other unrelated body classes are preserved.
	- Checklist state is keyed by time or mood so users get context-appropriate suggestions without cross-contamination.