# Flutter Codelab 02 — Preparing Your Development Environment

**SICT235 · Mobile Applications Development Using Flutter · PDB2 · UNRWA Gaza Training Centre · 2026–2027**

A complete, static, interactive GitHub Pages Codelab for a 120-minute web-first setup laboratory. Uses the **exact teacher owl artwork** supplied for the lesson (re-encoded as WebP) and the supplied classroom background without stretching. No build tool, npm, backend, or paid service is required for the website.

## Open locally

Open `index.html` in Chrome/Edge. Sidebar, step navigation, progress, quizzes, diagrams, and evidence checklist work locally. The **mini UI playground works offline** (it is a browser-based visual simulation, not a Flutter runtime). Links to official documentation require internet.

## Publish on GitHub Pages

1. Create a personal GitHub repository, for example `flutter-session-02`.
2. Upload the **contents of this folder** (`index.html`, `css`, `js`, `images`, `resources`, `sources.html`, and this README) to the repository root. Do **not** upload a ZIP as a single file.
3. In the GitHub repository choose **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch** → `main` → `/ (root)` and save.
5. Open the Pages URL GitHub displays after deployment. `index.html` is the entry point.
6. For later updates, replace only the files you intentionally revise and commit the changes.

Paths are relative, so a user repository Pages path works without a custom domain.

## Teaching flow — exactly 120 minutes

| Step | Focus | Min |
|---|---|---:|
| 01 | Welcome & roadmap | 5 |
| 02 | Developer toolkit | 10 |
| 03 | Before installation | 10 |
| 04 | Install VS Code, extensions and Flutter SDK | 35 |
| 05 | Interactive mini-app playground while SDK downloads | 10 |
| 06 | Verify environment | 15 |
| 07 | Create and run the starter Flutter app on Chrome/Edge | 25 |
| 08 | Required screenshots and next steps | 10 |

Step 04 offers a fourth footer button, **Play while downloading**, and an invitation beside the SDK download instructions. Step 05 is a small offline-capable visual UI playground: students change colors, greeting, icon and appearance, and tap buttons. A **Back to installation** control returns them to their prior reading position. This simulated phone interface is **not** executing Flutter or Dart. The final step includes three optional creative challenges instead of code exercises; Dart syntax is taught in Session 03. These are not extra screenshots or graded submissions.

Android Studio and physical Android phone guidance is a **separate optional after-class extension**, not part of the 120-minute total.

## Required student submission

Five genuine screenshots: both VS Code extensions, `dart --version`, full `flutter doctor`, `flutter devices` showing a browser, and a Flutter starter app running in Chrome/Edge. See `resources/setup-checklist.html` for print-friendly instructions. This website **does not collect or upload screenshots**; the instructor chooses the submission platform.

## State and privacy

Progress, quizzes, screenshot and after-lab creative challenge checkboxes run entirely in the student's browser. Progress/theme/evidence checks are stored locally in browser `localStorage` when permitted. They do not sync between devices. The website collects no personal information.

## Media and licensing

The two supplied mascot/classroom images are incorporated only as educational assets for this project. The supplied copyrighted textbook PDF is **not bundled**. The SVG explanatory diagrams are created for this lesson. `sources.html` maps the book sections and the official links.

## Important technical caveats

- Flutter SDK installation, browser deployment and Android device testing must be performed **on learners' own devices**; this website cannot install software or verify students' screenshots automatically.
- The phone playground is intentionally an **HTML/CSS/JavaScript teaching simulation**; do not confuse it with the real Flutter starter application created and run in Step 07. It does not need an SDK or an internet connection once the site files are available.
- `flutter doctor` may legitimately warn about Android toolchains during web-only setup.
- Software versions, image positions and tool requirements can change; refer to `sources.html` for the official up-to-date guidance.

