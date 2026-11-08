(() => {
  'use strict';
  const steps = [
    { title: 'Welcome & roadmap', minutes: 5 },
    { title: 'Developer toolkit', minutes: 10 },
    { title: 'Before installation', minutes: 10 },
    { title: 'Install & configure', minutes: 35 },
    { title: 'Flutter UI playground', minutes: 10 },
    { title: 'Flutter Doctor', minutes: 15 },
    { title: 'Run your first app', minutes: 25 },
    { title: 'Submit & next steps', minutes: 10 }
  ];
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => [...document.querySelectorAll(sel)];
  const storageKey = 'sict235-codelab02-state-v1';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (_) { }
  let done = Array.isArray(saved.done) ? saved.done.filter(v => Number.isInteger(v) && v >= 0 && v < 8) : [];
  let evidence = Array.isArray(saved.evidence) ? saved.evidence.map(Boolean).slice(0, 5) : [];
  let practice = Array.isArray(saved.playPractice) ? saved.playPractice.map(Boolean).slice(0, 3) : [];
  let installScrollPosition = 0;
  let current = /^([0-7]|android)$/.test(location.hash.slice(1)) ? location.hash.slice(1) : '0';
  const sidebar = $('#sidebar'), scrim = $('#scrim');
  function persist() { try { localStorage.setItem(storageKey, JSON.stringify({ done, evidence, playPractice: practice, theme: document.documentElement.dataset.theme })); } catch (_) { } }
  function showToast(msg) { const toast = $('#toast'); toast.textContent = msg; toast.hidden = false; clearTimeout(showToast._timer); showToast._timer = setTimeout(() => toast.hidden = true, 2600); }
  function openSidebar(open) { sidebar.classList.toggle('open', open); scrim.hidden = !open; $('#menuToggle').setAttribute('aria-expanded', String(open)); }
  $('#menuToggle').addEventListener('click', () => openSidebar(!sidebar.classList.contains('open')));
  $('#sidebarClose').addEventListener('click', () => openSidebar(false));
  scrim.addEventListener('click', () => openSidebar(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') openSidebar(false); });
  function applyTheme(theme) { document.documentElement.dataset.theme = theme; $('#themeToggle').textContent = theme === 'dark' ? '☀' : '◐'; $('#themeToggle').title = 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode'; persist(); }
  applyTheme(saved.theme === 'dark' ? 'dark' : 'light');
  $('#themeToggle').addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  const timeline = $('#timeline');
  steps.forEach((step, i) => { const div = document.createElement('div'); div.className = 'timeline-item'; div.innerHTML = `<b>${String(i + 1).padStart(2, '0')} · ${step.minutes} MIN</b><strong>${step.title}</strong><small>${i === 7 ? 'Evidence submission' : i === 6 ? 'Real first launch' : i === 4 ? 'Visual play while downloading' : 'Guided learning'}</small>`; timeline.append(div); });
  function showStep(step, replace = false, shouldScroll = true) {
    current = step === 'android' ? 'android' : String(Math.min(7, Math.max(0, Number(step) || 0)));
    $$('.lesson').forEach(panel => { const isActive = panel.dataset.panel === current; panel.hidden = !isActive; panel.classList.toggle('active', isActive); });
    $$('.step-link').forEach((button, i) => { button.classList.toggle('active', String(i) === current); button.classList.toggle('done', done.includes(i)); if (String(i) === current) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current'); });
    $$('.extra-link[data-step]').forEach(b => b.classList.toggle('active', current === 'android'));
    let index = Number(current), android = current === 'android';
    $('#pageIndex').textContent = android ? 'OPTIONAL ANDROID GUIDE' : `STEP ${String(index + 1).padStart(2, '0')} OF 08`;
    $('#footerDuration').textContent = android ? 'Extra learning (outside 120 minutes)' : `${steps[index].minutes} minute segment`;
    $('#markBtn').style.display = android ? 'none' : '';
    $('#markBtn').classList.toggle('done', !android && done.includes(index));
    $('#markBtn').setAttribute('aria-pressed', String(!android && done.includes(index)));
    $('#markBtn').textContent = !android && done.includes(index) ? '✓ Completed' : '✓ Mark completed';
    $('#prevBtn').disabled = !android && index === 0;
    $('#nextBtn').textContent = android ? 'Back to submission →' : index === 7 ? 'Finish lesson ✓' : 'Next step →';
    const switchBtn = $('#switchPlayBtn');
    switchBtn.hidden = android || (index !== 3 && index !== 4);
    switchBtn.textContent = index === 3 ? '✦ Play while downloading' : '↶ Return to setup';
    if (replace) history.replaceState(null, '', '#' + current); else history.pushState(null, '', '#' + current);
    openSidebar(false);
    if (shouldScroll) {
      // Top-of-section scrolling is for explicit navigation only, not completion or initial load.
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    if (document.activeElement && document.activeElement.closest('.sidebar')) $('#content').focus({ preventScroll: true });
  }
  function updateProgress() { const n = done.length; $('#progressLabel').textContent = `${n} of 8`; $('#progressFill').style.width = `${n * 12.5}%`; $('#progressbar').setAttribute('aria-valuenow', String(n * 12.5)); $$('.step-link').forEach((b, i) => b.classList.toggle('done', done.includes(i))); }
  //function goNext() { if (current === 'android') { showStep(7); return } const idx = Number(current); if (idx === 7) { showToast('Lesson complete! Check your five evidence files.'); return } showStep(idx + 1); }

  // ==========================================
  // Lesson celebration
  // ==========================================

  function openLessonCelebration() {

    // Mark only the final lesson step as completed.
    if (!done.includes(7)) {
      done.push(7);
      done.sort((a, b) => a - b);
      updateProgress();
      persist();
    }

    // Update the visible completion button.
    const markButton = $('#markBtn');
    markButton.classList.add('done');
    markButton.textContent = '✓ Completed';
    markButton.setAttribute('aria-pressed', 'true');

    // Display the real evidence checklist progress.
    const checked = evidence.filter(Boolean).length;

    $('#completionEvidence').textContent =
      `${checked} of 5 screenshots checked`;

    // Create lightweight confetti.
    const container = $('#completionConfetti');
    container.replaceChildren();

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!reducedMotion) {
      const colors = [
        '#087bbb',
        '#ffd464',
        '#3ec6b8',
        '#7d62db',
        '#e76a90'
      ];

      for (let i = 0; i < 32; i++) {
        const piece = document.createElement('i');

        piece.style.left = `${(i * 37) % 100}%`;
        piece.style.background = colors[i % colors.length];
        piece.style.animationDelay = `${(i % 8) * 0.12}s`;
        piece.style.animationDuration =
          `${2.3 + (i % 6) * 0.25}s`;

        piece.style.setProperty(
          '--drift',
          `${(i % 2 ? -1 : 1) * (24 + (i % 4) * 17)}px`
        );

        container.appendChild(piece);
      }
    }

    // Open the celebration without scrolling the page.
    $('#completionDialog').showModal();
  }

  // Replace the old goNext function.
  function goNext() {
    if (current === 'android') {
      showStep(7);
      return;
    }

    const idx = Number(current);

    if (idx === 7) {
      openLessonCelebration();
      return;
    }

    showStep(idx + 1);
  }

  // Celebration screen buttons.
  $('#completionClose').addEventListener('click', () => {
    $('#completionDialog').close();
  });

  $('#completionReview').addEventListener('click', () => {
    $('#completionDialog').close();

    $('#evidenceList').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  function goPlayground() {
    if (current === '3') installScrollPosition = window.scrollY;
    showStep(4);
  }
  function returnToInstallation() {
    const wanted = Math.max(0, installScrollPosition);
    showStep(3, false, false);
    // Restore the install page's reading position after reactivating it.
    requestAnimationFrame(() => window.scrollTo({ top: wanted, behavior: 'instant' }));
  }
  $('#switchPlayBtn').addEventListener('click', () => current === '3' ? goPlayground() : returnToInstallation());
  $('#playFromInstall').addEventListener('click', goPlayground);
  $('#returnInstallTop').addEventListener('click', returnToInstallation);
  $('#returnInstallInline').addEventListener('click', returnToInstallation);
  $('#nextBtn').addEventListener('click', goNext);
  $('#prevBtn').addEventListener('click', () => showStep(current === 'android' ? 7 : Math.max(0, Number(current) - 1)));
  $('#markBtn').addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (current === 'android') return;
    // Capture the exact viewport before changing progress; scroll anchoring and
    // smooth-scroll must not move readers away from the lesson footer.
    const root = document.scrollingElement || document.documentElement;
    const x = window.scrollX, y = window.scrollY;
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    const i = Number(current);
    done = done.includes(i) ? done.filter(v => v !== i) : [...done, i].sort((a, b) => a - b);
    const completed = done.includes(i);
    updateProgress();
    $('#markBtn').classList.toggle('done', completed);
    $('#markBtn').textContent = completed ? '✓ Completed' : '✓ Mark completed';
    $('#markBtn').setAttribute('aria-pressed', String(completed));
    persist();
    showToast(completed ? 'Step marked completed' : 'Step marked not completed');
    // No showStep(), URL changes, focus jumps, or navigation for completion.
    root.scrollTop = y;
    window.scrollTo(x, y);
    requestAnimationFrame(() => {
      root.scrollTop = y;
      window.scrollTo(x, y);
      requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = previousBehavior; });
    });
  });
  $$('[data-step]').forEach(button => button.addEventListener('click', () => showStep(button.dataset.step)));
  window.addEventListener('popstate', () => showStep(location.hash.slice(1) || 0, true));
  window.addEventListener('hashchange', () => { const next = location.hash.slice(1) || 0; if (next !== current) showStep(next, true) });
  $$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const txt = button.dataset.copy.replace(/&#10;/g, '\n');
    try { await navigator.clipboard.writeText(txt); showToast('Copied to clipboard'); }
    catch (_) {
      const ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.append(ta); ta.focus(); ta.select(); const ok = document.execCommand('copy'); ta.remove(); showToast(ok ? 'Copied to clipboard' : 'Copy unavailable—select the command text manually');
    }
    const original = button.textContent; button.textContent = 'Copied ✓'; setTimeout(() => button.textContent = original, 1350);
  }));
  $$('.quiz').forEach(block => {
    const buttons = $$('button[data-answer]').filter(button => block.contains(button));
    buttons.forEach(button => button.addEventListener('click', () => {
      const yes = button.dataset.answer === 'correct'; buttons.forEach(b => b.classList.remove('correct', 'incorrect')); button.classList.add(yes ? 'correct' : 'incorrect');
      block.querySelector('.feedback').textContent = yes ? '✓ Correct. You can move on.' : block.dataset.quiz === 'doctor' ? 'Not quite. Browser testing does not require Android Studio. Try again.' : 'Try another tool. Which one adds Flutter editing support to VS Code?';
    }));
  });
  // Small, offline, visual Flutter-style app playground. It does not run Dart.
  const colors = {
    blue: { main: '#087bbb', soft: '#e3f5ff', label: 'Ocean blue' },
    purple: { main: '#7059d6', soft: '#eeebff', label: 'Creative purple' },
    coral: { main: '#bd4960', soft: '#fff0ee', label: 'Warm coral' },
    green: { main: '#158c7a', soft: '#def8ee', label: 'Fresh green' }
  };
  const play = { color: 'blue', icon: '🚀', message: 'Hello, Flutter explorer!', dark: false, likes: false, taps: 0 };
  const playMessages = ['Hello, Flutter explorer!', 'My first creative app!', 'Learning is an adventure!', 'Made with curiosity ✨'];
  const icons = ['🚀', '🎨', '📚', '🌿'];
  const colorNames = Object.keys(colors);
  function paintPlayground(status) {
    const phone = $('#playPhone'), color = colors[play.color];
    phone.style.setProperty('--play-accent', color.main);
    phone.style.setProperty('--play-soft', color.soft);
    phone.dataset.previewTheme = play.dark ? 'dark' : 'light';
    $('#playGreeting').textContent = play.message.trim() || 'Your message goes here…';
    $('#playAvatar').textContent = play.icon;
    if (document.activeElement !== $('#playGreetingInput')) $('#playGreetingInput').value = play.message;
    $('#playDarkToggle').checked = play.dark;
    $('#playHeart').setAttribute('aria-pressed', String(play.likes));
    $('#playHeartIcon').textContent = play.likes ? '♥' : '♡';
    $('#playHeartCount').textContent = play.likes ? '1' : '0';
    $('#playTapMessage').textContent = play.taps ? `You've tapped ${play.taps} ${play.taps === 1 ? 'time' : 'times'}! ✨` : 'Give the buttons a try!';
    $$('[data-play-color]').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.playColor === play.color)));
    $$('[data-play-icon]').forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.playIcon === play.icon)));
    if (status) $('#playLiveStatus').textContent = status;
  }
  $$('[data-play-color]').forEach(button => button.addEventListener('click', () => {
    play.color = button.dataset.playColor;
    paintPlayground(`${colors[play.color].label} looks great! Try an icon next.`);
  }));
  $$('[data-play-icon]').forEach(button => button.addEventListener('click', () => {
    play.icon = button.dataset.playIcon;
    paintPlayground('New picture selected! Your app changes instantly.');
  }));
  $('#playGreetingInput').addEventListener('input', event => {
    play.message = event.target.value;
    paintPlayground('Your greeting is now on the mini app!');
  });
  $('#playDarkToggle').addEventListener('change', event => {
    play.dark = event.target.checked;
    paintPlayground(play.dark ? 'Dark mode enabled—compare the contrast.' : 'Light mode enabled!');
  });
  $('#playHeart').addEventListener('click', () => {
    play.likes = !play.likes;
    paintPlayground(play.likes ? 'You liked the mini app! ❤️' : 'Like removed.');
  });
  $('#playTap').addEventListener('click', () => {
    play.taps++;
    paintPlayground('Nice tap! Notice how the count changes.');
  });
  $('#playSurprise').addEventListener('click', () => {
    // Vary multiple attributes in one click to encourage exploration.
    const previous = play.color;
    const otherColors = colorNames.filter(c => c !== previous);
    play.color = otherColors[Math.floor(Math.random() * otherColors.length)];
    play.icon = icons[Math.floor(Math.random() * icons.length)];
    play.message = playMessages[Math.floor(Math.random() * playMessages.length)];
    play.dark = Math.random() > .65;
    play.likes = false;
    play.taps = 0;
    paintPlayground('Surprise! The mini app got a fresh design.');
  });
  $('#playReset').addEventListener('click', () => {
    Object.assign(play, { color: 'blue', icon: '🚀', message: 'Hello, Flutter explorer!', dark: false, likes: false, taps: 0 });
    paintPlayground('All set! Explore a new design.');
  });
  paintPlayground();
  // Second playground: real Flutter code in DartPad.
  const loadFocusBoard = $('#loadFocusBoard');

  if (loadFocusBoard) {
    loadFocusBoard.addEventListener('click', () => {
      const frame = $('#focusBoardFrame');

      frame.hidden = false;

      if (!frame.getAttribute('src')) {
        frame.src = frame.dataset.src;
      }

      loadFocusBoard.textContent = 'Flutter Editor Loaded';
      loadFocusBoard.disabled = true;
    });
  }
  function updateEvidence() { let count = 0; $$('[data-evidence]').forEach(el => { const i = Number(el.dataset.evidence); el.checked = !!evidence[i]; if (el.checked) count++; }); $('#evidenceCount').textContent = `${count} of 5 files checked`; }
  $$('[data-evidence]').forEach(el => el.addEventListener('change', () => { evidence[Number(el.dataset.evidence)] = el.checked; persist(); updateEvidence(); }));
  function updatePractice() { let count = 0; $$('[data-practice]').forEach(el => { const i = Number(el.dataset.practice); el.checked = !!practice[i]; if (el.checked) count++; }); $('#postlabProgress').textContent = `${count} of 3 creative challenges checked`; }
  $$('[data-practice]').forEach(el => el.addEventListener('change', () => { practice[Number(el.dataset.practice)] = el.checked; persist(); updatePractice(); }));
  $$('[data-jump]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.getElementById(link.dataset.jump);
    if (target) target.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }));
  updateProgress(); updateEvidence(); updatePractice(); showStep(current, true, false);
})();

/* ==========================================
   FINAL FOCUSBOARD — REFERENCE APPLICATION
   Load the second DartPad when revealed.
   Keep the starter DartPad unchanged.
   ========================================== */

const completedFocusBoard =
  document.querySelector('#completedFocusBoard');

completedFocusBoard?.addEventListener('toggle', () => {
  if (!completedFocusBoard.open) return;

  const frame = document.querySelector(
    '#completedFocusBoardFrame'
  );

  if (frame && !frame.getAttribute('src')) {
    frame.src = frame.dataset.src;
  }
});


