# Codelab 02 — Quality Assurance Report

**Revision date:** 7 November 2026  
**Target:** GitHub Pages / offline-openable HTML · SICT235 · PDB2

## Current version changes

- Replaced Step 05's DartPad coding session with an interactive **visual UI playground** (HTML/CSS/JS simulation). It is **not** a real Flutter/Dart compiler and explicitly says so in the student site.
- Four color choices, four visual icons, editable greeting, preview-only dark mode, Like toggle, Tap counter, Surprise me and Start over. All interactive controls are client-side, no SDK or external network required once files are available.
- Added `Play while downloading` button to the **Install & Configure** footer as a fourth action. An invitation in the installation content also links to the playground. The playground's `Return to setup` control returns to the saved installation scroll position.
- Replaced the earlier DartPad `print()` follow-up with three optional **creative** challenges; introductory Dart console exercises can be taught in Session 03.
- Retained the original eight-step timetable, five actual machine screenshot requirements, real Flutter starter app workflow, optional Android/Xiaomi setup guide, mascot and source references.

## Verified static checks

- Eight core sections plus an optional after-class Android guide.
- Durations `5 + 10 + 10 + 35 + 10 + 15 + 25 + 10 = 120 minutes`.
- Five student screenshot items remain unchanged.
- No remote iframe in the playground. The mini phone preview is explicitly labeled as an original **visual simulation**, not a Flutter execution.
- JavaScript syntax validated; all local links and image paths checked; original SVG assets parse.
- Local GitHub Pages ZIP contains relative paths and needs no npm, backend or external UI dependencies; standalone version inlines CSS, JS and images.

## Actual browser interaction regression test

Tested using headless Chromium with the current site's markup, CSS, JS and images inlined into a test document because this environment blocks navigation to local file and HTTP preview URLs.

- Entered the installation step and confirmed that the **fourth footer action** appears there; the corresponding label changes to `Return to setup` in Step 05.
- Used the invitation to open the playground. Selected purple (swatch `aria-pressed=true` and accent changed), changed message and icon, enabled dark mode, liked the screen, tapped the button twice, randomized and reset controls. All visible states matched expected results.
- Returned from playground to installation: scroll position **1159 → 1159 px** (delta 0).
- Used footer shortcut in both directions: installation reading position **3229 → 3229 px** (delta 0).
- Marked the installation step complete afterward: scroll position remained **3229 px**.
- At a 390 px mobile viewport, main page `scrollWidth` and `clientWidth` both equaled **390 px** (no horizontal overflow), and the simulated phone was fully visible at 302 px wide.
- No page JavaScript errors were reported during these tests.

## Limitations and required final checks

- Real installations of Flutter SDK, Android Studio, USB-connected devices and an actual Flutter app build have **not** been executed in this environment.
- The visual playground is intentionally not Flutter output. Do **not** accept it as evidence 05; that evidence remains the actual `flutter run` starter app in Chrome/Edge.
- On a real machine, open the downloaded ZIP's `index.html` or published website to confirm the local file and clipboard behaviors, persisted checkboxes and any caching differences.
- Selected textbook figure crops in the starter-app section are labeled with page references. Confirm permission to reuse them publicly before publishing, or replace with instructor-created software screenshots.
- Platform installation instructions can change; consult the linked official Flutter/Android documentation before teaching.

### Instructional sequence correction (7 November 2026)
- Removed premature Git references from the SDK→app→browser workflow SVG and its figure caption. Git is introduced and explained in its own toolkit card before installation checks.
- The opening roadmap now speaks of setup prerequisites without requiring unexplained Git knowledge.

### Developer-toolkit diagram note (7 November 2026)
- Replaced the browser-only caption with a clear comparison of target-specific setup: web (Chrome/Edge), Android (Android SDK), iOS (Xcode on macOS), and desktop toolchains.
- No premature Git mention; detailed platform requirements remain in the next concept diagram.
- Renamed the toolchain image to `toolchain-targets.svg` to avoid displaying the old cached diagram after publishing.
