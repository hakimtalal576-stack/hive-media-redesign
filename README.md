# Hive Media — website redesign

A complete UI/UX elevation of the Hive Media site (hive-media.net), built as a static,
dependency-free front end so it can be reviewed in the browser and dropped onto any host.

**This is a concept design prepared for review, not the official live website.**

---

## What was kept

The redesign works from the existing site, not from a blank page. Everything that already
worked is preserved:

- The same brand position: digital advertising across Kuwait, without limits.
- The same content pillars: digital out-of-home, in-mall digital, smart vending machines, Hive X.
- The same screen network (Hive 1.0 to 5.0) and the same screen films.
- The same contact details: phone, email, office address, social profiles.
- The same single conversion goal: request a proposal.

No clients, statistics, testimonials or claims were invented. The only numbers on the page
are the ones the existing site states (15 screens, 3 media formats, 5 screen generations).

## What changed

**Design system.** One type scale (Inter Tight for everything structural, Instrument Serif
italic for a single accent word per headline), one warm near-black / warm paper palette with a
single gold accent, one spacing scale, one grid. Every section is built from the same tokens.

**Hero.** Full-bleed film of Kuwait with a bottom-anchored editorial headline, one primary CTA
and one quiet secondary action. The film is muted, looped, and replaced by a still frame on
reduced-motion and small screens.

**Structure.** The page now reads as a story: hook, proof of scale, the three formats,
the flagship, the screen network, who we are, how we work, contact. Backgrounds alternate
between near-black and warm paper so sections are chapters, not boxes.

**Motion.** Scroll reveals with a small stagger, an animated marquee, counting statistics,
a sticky Hive X stage, an interactive LED-screen simulator, a drawing process line, and
subtle hover states. All of it is opt-out via `prefers-reduced-motion`, and none of it is
required to read the page.

**Hive X simulator.** The screen in the Hive X photograph is a live canvas: type a brand name
and it is drawn in LED dots with the same perspective as the billboard. Three screen colours
(amber, ice, rose) change the LED and the light spill on the tower, and a motion toggle turns the
message into a scrolling ticker. Every control is a real button with a keyboard path.

**Details.** Sticky navigation with active-section state, scroll progress hairline, copy-to-clipboard
for phone and email, a live Kuwait clock, keyboard-navigable screen tabs, visible focus states,
and an Arabic (RTL) switch that mirrors the entire layout.

## Interaction layer

The page is built to feel alive without becoming a demo reel. Every effect below is
additive: with JavaScript off, a coarse pointer, or reduced motion, the page is unchanged
and fully readable.

| Where | What it does |
| --- | --- |
| Hero | Faint engineering grid and a soft light that follows the pointer; headline and coordinates drift a few pixels against the film for depth. |
| Media cards | Chapter cards lean subtly in 3D under the pointer; images and the screens stage carry a light sheen that tracks the cursor. |
| Hive X | Type a name, switch the LED colour, toggle the ticker, watch the light spill on the tower. Drag or swipe the screens stage to move between films. |
| Navigation | Hides on scroll down, returns on scroll up, marks the section you are in, and always returns on keyboard focus. |
| Footer | A hex field lights up in gold under the pointer, on brand for a company called Hive. |
| Everywhere | Scroll reveals, counting statistics, a progress hairline, and a back-to-top control that appears once you are deep in the page. |
| Hover craft | Format rows take a gold wash that follows the pointer and lean their heading in; the fact strip warms its number and lifts; chapter cards light a gold hairline edge; screen stills lift off the page; footer links draw their underline in; the logo mark answers the pointer. |

## Light and dark

The house look is dark; light is one click away and remembered.

The toggle sits in the nav (sun in dark, moon in light), is a 44 px target, exposes its
state with `aria-pressed`, and persists to `localStorage`. A small inline script sets the
theme before first paint, so there is no flash on reload. The switch itself is a 0.5 s
cross-fade, skipped under reduced motion.

Light mode is a real theme, not an inversion filter. The page ground flips to warm paper and
the "paper" chapters flip to ink, so the rhythm of light and dark bands survives the switch.
The hero film, the photo chapters and the glass copy over media stay dark in both themes,
and the accent returns to bright gold inside them. The gold accent darkens to `#7C5900` on
paper so type keeps its contrast: every text pair on the page was measured, and the lowest
ratio is 4.5:1 for body text and 3:1 for display. `color-scheme` and the `theme-color` meta
follow the choice.

## Structure

```
index.html            single page, all sections
assets/css/site.css   design tokens + layout + motion
assets/js/site.js     reveals, counters, marquee, simulator, screen tabs, pointer layer, language
assets/media/         photography, film, screen stills
```

## Preview locally

Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly from disk also works, but a server is recommended so the
film and fonts load consistently.

## Notes for review

- Content is written to be clear and short. Where the original site had longer passages,
  the message is kept but tightened. Nothing new is claimed.
- The "Concept design prepared for Hive Media. Not the official website." line in the footer
  is intentional and should be removed only when the design is approved and goes live.
- Browser support: current Chrome, Safari, Firefox and Edge. Scroll-driven enhancements
  degrade gracefully where unsupported.
