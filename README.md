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
and it is drawn in LED dots with the same perspective as the billboard, on every screen generation.

**Details.** Sticky navigation with active-section state, scroll progress hairline, copy-to-clipboard
for phone and email, a live Kuwait clock, keyboard-navigable screen tabs, visible focus states,
and an Arabic (RTL) switch that mirrors the entire layout.

## Structure

```
index.html            single page, all sections
assets/css/site.css   design tokens + layout + motion
assets/js/site.js     reveals, counters, marquee, Hive X simulator, screen tabs, language
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
