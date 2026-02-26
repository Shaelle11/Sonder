# Sonder — Case Study

## TL;DR
Sonder is a minimal, reflective web experience that helps people pause and check in with themselves through time-of-day "time capsules" and mood-driven reflections. Built with HTML and CSS only, Sonder demonstrates how subtle visual systems and gentle interaction design can support emotional awareness without heavy feature sets or tracking.

## Problem
Many wellness products add complexity: accounts, tracking, or intrusive notifications. People looking for a moment of calm need lightweight, non-demanding places to reflect—tools that respect attention and emotional safety.

## Solution
Sonder provides a quiet digital pause: four time-of-day capsules (morning, afternoon, evening, night) that change tone and content to gently prompt reflection and micro self-care. The experience uses color, typography, and micro-interactions to create emotional safety rather than activity pressure.

## Goals
- Create a low-friction reflection flow with no sign-in or tracking.
- Communicate mood and time through subtle visual language.
- Encourage tiny, actionable self-care moments (1–3 items) rather than habit enforcement.
- Ship a fully static, accessible site using only HTML and CSS.

## Target Audience
Students, remote workers, and busy adults who need calm digital rituals—people who prefer minimal interfaces, soft prompts, and tools that honor privacy and low cognitive load.

## Research & Insights
- Wellness UX benefits from reduced decision friction and obvious, predictable structure.
- Emotional safety is supported by consistent layout, generous whitespace, and slow visual rhythm (soft transitions, muted color shifts).
- Time-of-day framing helps users contextualize short reflections—morning for intention-setting, evening for unwinding.

These insights informed the visual system and content tone in the design documentation: see [Design Documentation.md](Design%20Documentation.md).

## Design Process
1. Constraints: HTML/CSS only. No JavaScript, no analytics, no user accounts. This constraint shaped simplicity-first interactions.
2. Visual exploration: created a palette and typographic hierarchy focused on calm (see the visual system in the design document).
3. Content mapping: wrote short micro-prompts and micro-checklists per time capsule to fit quick interactions.
4. Build: authored static pages under the `pages/` directory and a single stylesheet at `styles/style.css` for theming and transitions.

## Visual System
- Colors: soft lavenders, creams, warm pink, neutral dark, and deep night blues to distinguish time capsules while keeping contrast gentle.
- Typography: a warm serif for headings and a clean sans-serif for body text—large headings, generous line spacing, minimal emphasis on bold colors.
- Layout: one-screen, centered cards with generous breathing room and rounded elements to avoid visual sharpness.

For full visual details and rationale, see [Design Documentation.md](Design%20Documentation.md).

## Interaction & Features
- Time-of-Day Capsules: four curated pages—`morning`, `afternoon`, `evening`, `night`—each with tailored prompts and visual tone.
- Mood-Based Reflection: users select a mood and receive contextually gentle copy and suggested micro-actions.
- Self-Care Check-In: a lightweight checklist encourages 1–3 small acts (stretch, water, breathe) without progress tracking.
- No Tracking: the product intentionally avoids analytics and accounts to preserve privacy and reduce pressure.

## Implementation
- Static site: `index.html` links to curated pages under `pages/` and uses `styles/style.css` for theming.
- Accessibility: high-contrast text sizes, clear focus styles, and semantic HTML to support keyboard navigation and screen readers.

Project structure (key files)

- [index.html](index.html)
- [styles/](styles/) base.css, layout.css, component.css, themes.css and index.css. 
- [pages/](pages/): time capsule pages and moods

## Challenges & Tradeoffs
- Constraint of using only HTML/CSS meant no persisted state and no dynamic personalization—tradeoff accepted for simplicity and privacy.
- Balancing emotion and clarity: designs must feel warm without becoming ambiguous; content tone was iterated to maintain helpfulness.

## Results & Learnings
- Outcome: a calm, private, and approachable micro-reflection experience that can be hosted easily on static platforms.
- Learnings: emotional UX benefits from predictable structure, soft visual cues, and small, doable actions rather than feature-rich interventions.

## Next Steps
- Add optional copy variations for accessibility (larger type / high-contrast mode).
- Consider progressive enhancement (lightweight JS) for local-only preferences while preserving privacy.
- Test with a small group for content tone and perceived helpfulness.

## Credits
Design & Implementation: Nanji Lakan and Florence Onwuegbuzie

Read a concise project summary in the repository README: [README.md](README.md)
