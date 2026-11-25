/* ==========================================================================
   Hive Media — interaction layer
   No dependencies. Everything degrades to a readable, static page.
   ========================================================================== */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ======================================================================
     1. Copy
     ====================================================================== */
  const T = {
    en: {
      note: 'Concept design prepared for Hive Media. Not the official website.',
      kwTime: 'Kuwait time',
      langLabel: 'Switch to Arabic', langBtn: 'ع',
      theme: 'Light theme', themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme',
      menu: 'Open menu', close: 'Close menu',
      navMedia: 'Solutions', navX: 'Hive X', navScreens: 'Screens', navAbout: 'About', navContact: 'Contact',
      book: 'Request a proposal', iLink: 'Discover Hive X',
      live: 'Live across Kuwait', hiveHq: 'Kuwait City', scroll: 'Scroll',
      h1a: 'Digital advertising', h1b: 'without limits.',
      sub: "LED screens across Kuwait's busiest locations, in-mall displays at the point of purchase, and smart vending media.",
      rot: [
        "Kuwait's <em>largest</em> digital screen",
        'LED screens across the <em>busiest</em> locations',
        'In malls, on streets, at the <em>point of purchase</em>',
        'Five screen generations. <em>One network.</em>'
      ],
      ticker: ['Digital out-of-home', 'In-mall digital', 'Vending machines', 'Hive X', "Kuwait's largest digital screen", 'Hive Media · Kuwait'],
      iKick: 'Digital advertising without limits',
      iHa: "Hive Media runs LED screens across Kuwait's busiest locations,",
      iHb: "including Kuwait's largest digital screen.",
      f1: 'years in media', f2: 'media formats', f3: 'km of visibility', f4: 'screen generations',
      explore: 'Explore',
      xEyebrow: 'The flagship', t1: "Kuwait's largest digital screen",
      sEyebrow: 'Portfolio', t2b: 'Screens', t2: 'Hive 1.0 to 5.0, each with its film',
      mEyebrow: 'Our media', mHa: 'Three formats.', mHb: 'One city.',
      mL: 'Three formats to place your brand in front of Kuwait: outdoor LED screens, displays inside malls, and vending machines with digital screens.',
      m1k: 'DOOH', m1: 'Digital out-of-home', m1d: "High-impact LED screens across Kuwait's busiest locations.",
      m2k: 'In-mall', m2: 'In-mall digital', m2d: 'High-definition vertical displays that engage shoppers at the point of purchase.',
      m3k: 'Vending', m3: 'Vending machines', m3d: 'Smart vending solutions combined with digital displays for modern retail.',
      solNote: 'Tell us your dates and budget. We recommend the screens and locations that fit.',
      xLead: "Kuwait's largest digital screen.",
      xBody: 'Strategically located in the heart of Kuwait City, Hive X gives your brand exceptional visibility.',
      xStat: 'visible from up to five kilometres away',
      xWatch: 'Watch Hive X',
      simLabel: 'See your brand on Hive X', simPh: 'Type your brand name', simClear: 'Clear',
      simNote: 'A simulation on a photo of Hive X. Watch the screen as you type.',
      simDemo: 'YOUR BRAND', simSet: 'Showing on Hive X: ',
      simColor: 'Screen colour', simModeLabel: 'Animate the message',
      swGold: 'Amber', swIce: 'Ice', swRose: 'Rose',
      simStill: 'Static', simMoving: 'Scrolling', toTop: 'Back to top',
      sHa: 'The Hive', sHb: 'screens', sL: 'Every screen has a film. Choose one to watch it on YouTube.',
      watch: 'Watch on YouTube', tagFlag: 'Flagship', tagScreen: 'Screen', tagFilm: 'Film',
      hEyebrow: 'About us', hHa: 'Kuwait is', hHb: 'home',
      hBody: 'A team of media experts with more than 15 years of experience. We offer our joint knowledge and futuristic vision to clients in Kuwait and the region.',
      drag: 'Drag to rotate',
      a1: 'Based in', a1v: 'Salmiya, Kuwait',
      a2: 'Working across', a2v: 'Kuwait and the region',
      a3: 'Experience', a3v: '15+ years in media',
      pEyebrow: 'How it works', pHa: 'From brief to', pHb: 'live',
      p1: 'Share your brief', p1d: 'Tell us your brand, audience, dates and budget.',
      p2: 'Receive a proposal', p2d: 'We recommend screens and locations, with availability and pricing.',
      p3: 'Go live', p3d: 'Your creative is approved and scheduled across your chosen screens.',
      p4: 'See it running', p4d: 'You receive proof of display and a summary of your campaign.',
      cEyebrow: 'Contact', cEyebrow2: 'Contact', cHa: 'Ready to', cHb: 'amplify', cHc: 'your brand?',
      cL: 'Get in touch to discuss your advertising goals and see how we can maximise your visibility.',
      cCall: 'Call us', cMail: 'Email us',
      addr: 'Al Munira Complex, Floor 3, Offices 6 & 7<br>Salim Al Mubarak St., Block 7, Salmiya, Kuwait',
      map: 'Open in Google Maps', copy: 'Copy', copied: 'Copied',
      fSol: 'Solutions', fFollow: 'Follow us',
      fTag: 'Digital advertising without limits. Out-of-home media in Kuwait.',
      rights: 'All rights reserved.'
    },
    ar: {
      note: 'تصميم مبدئي مُعدّ لهايف ميديا. ليس الموقع الرسمي.',
      kwTime: 'توقيت الكويت',
      langLabel: 'التبديل إلى الإنجليزية', langBtn: 'EN',
      theme: 'المظهر الفاتح', themeLight: 'التبديل إلى المظهر الفاتح', themeDark: 'التبديل إلى المظهر الداكن',
      menu: 'افتح القائمة', close: 'أغلق القائمة',
      navMedia: 'حلولنا', navX: 'هايف X', navScreens: 'الشاشات', navAbout: 'من نحن', navContact: 'تواصل',
      book: 'اطلب عرضاً', iLink: 'اكتشف هايف X',
      live: 'على الهواء في أنحاء الكويت', hiveHq: 'مدينة الكويت', scroll: 'مرّر',
      h1a: 'إعلان رقمي', h1b: 'بلا حدود.',
      sub: 'شاشات LED في أكثر مواقع الكويت ازدحاماً، وشاشات داخل المجمعات عند نقطة الشراء، ومكائن بيع ذكية بشاشات رقمية.',
      rot: [
        '<em>أكبر</em> شاشة رقمية في الكويت',
        'شاشات LED في <em>أكثر</em> المواقع ازدحاماً',
        'في المجمعات، في الشوارع، وعند <em>نقطة الشراء</em>',
        'خمسة أجيال من الشاشات. <em>شبكة واحدة.</em>'
      ],
      ticker: ['إعلانات رقمية خارجية', 'شاشات داخل المجمعات', 'مكائن البيع', 'هايف X', 'أكبر شاشة رقمية في الكويت', 'هايف ميديا · الكويت'],
      iKick: 'إعلان رقمي بلا حدود',
      iHa: 'هايف ميديا تشغّل شاشات LED في أكثر مواقع الكويت ازدحاماً،',
      iHb: 'ومنها أكبر شاشة رقمية في الكويت.',
      f1: 'سنة في الميديا', f2: 'وسائل إعلانية', f3: 'كم مدى الرؤية', f4: 'أجيال من الشاشات',
      explore: 'اكتشف',
      xEyebrow: 'الشاشة الأبرز', t1: 'أكبر شاشة رقمية في الكويت',
      sEyebrow: 'أعمالنا', t2b: 'الشاشات', t2: 'من هايف 1.0 إلى 5.0، ولكل شاشة فيلمها',
      mEyebrow: 'وسائلنا', mHa: 'ثلاث وسائل.', mHb: 'مدينة واحدة.',
      mL: 'ثلاث وسائل تضع علامتك أمام الكويت: شاشات LED خارجية، وشاشات داخل المجمعات، ومكائن بيع بشاشات رقمية.',
      m1k: 'خارجية', m1: 'الإعلانات الرقمية الخارجية', m1d: 'شاشات LED عالية التأثير في أكثر مواقع الكويت ازدحاماً.',
      m2k: 'داخل المجمعات', m2: 'الإعلانات الرقمية داخل المجمعات', m2d: 'شاشات عمودية عالية الوضوح تصل إلى المتسوقين عند نقطة الشراء.',
      m3k: 'مكائن البيع', m3: 'مكائن البيع', m3d: 'مكائن بيع ذكية مع شاشات رقمية لتجارة التجزئة الحديثة.',
      solNote: 'أخبرنا بالتواريخ والميزانية، ونقترح الشاشات والمواقع المناسبة.',
      xLead: 'أكبر شاشة رقمية في الكويت.',
      xBody: 'في موقع استراتيجي في قلب مدينة الكويت، تمنح هايف X علامتك حضوراً استثنائياً.',
      xStat: 'تُرى من مسافة تصل إلى خمسة كيلومترات',
      xWatch: 'شاهد هايف X',
      simLabel: 'شاهد علامتك على هايف X', simPh: 'اكتب اسم علامتك', simClear: 'مسح',
      simNote: 'محاكاة على صورة لشاشة هايف X. راقب الشاشة وأنت تكتب.',
      simDemo: 'علامتك هنا', simSet: 'تظهر الآن على هايف X: ',
      simColor: 'لون الشاشة', simModeLabel: 'تحريك الرسالة',
      swGold: 'كهرماني', swIce: 'ثلجي', swRose: 'وردي',
      simStill: 'ثابت', simMoving: 'متحرك', toTop: 'إلى الأعلى',
      sHa: 'شاشات', sHb: 'هايف', sL: 'لكل شاشة فيلم. اختر واحدة لتشاهده على يوتيوب.',
      watch: 'شاهد على يوتيوب', tagFlag: 'الشاشة الأبرز', tagScreen: 'شاشة', tagFilm: 'فيلم',
      hEyebrow: 'من نحن', hHa: 'الكويت', hHb: 'بيتنا',
      hBody: 'فريق من خبراء الميديا بخبرة تتجاوز ١٥ عاماً. نضع معرفتنا المشتركة ورؤيتنا المستقبلية في خدمة عملائنا في الكويت والمنطقة.',
      drag: 'اسحب لتدوير الكرة',
      a1: 'مقرنا', a1v: 'السالمية، الكويت',
      a2: 'نعمل في', a2v: 'الكويت والمنطقة',
      a3: 'الخبرة', a3v: 'أكثر من ١٥ عاماً في الميديا',
      pEyebrow: 'كيف نعمل', pHa: 'من البريف إلى', pHb: 'البث',
      p1: 'شاركنا البريف', p1d: 'أخبرنا عن علامتك وجمهورك والتواريخ والميزانية.',
      p2: 'استلم العرض', p2d: 'نقترح الشاشات والمواقع مع التوفر والأسعار.',
      p3: 'ابدأ البث', p3d: 'نعتمد تصميمك ونجدوله على الشاشات التي اخترتها.',
      p4: 'شاهده يعمل', p4d: 'تستلم إثبات العرض وملخصاً لحملتك.',
      cEyebrow: 'تواصل', cEyebrow2: 'تواصل', cHa: 'جاهز', cHb: 'لتكبير', cHc: 'حضور علامتك؟',
      cL: 'تواصل معنا لنناقش أهدافك الإعلانية ونريك كيف نرفع ظهورك إلى أقصى حد.',
      cCall: 'اتصل بنا', cMail: 'راسلنا',
      addr: 'مجمع المنيرة، الدور ٣، مكتب ٦ و٧<br>شارع سالم المبارك، قطعة ٧، السالمية، الكويت',
      map: 'افتح في خرائط Google', copy: 'نسخ', copied: 'تم النسخ',
      fSol: 'حلولنا', fFollow: 'تابعونا',
      fTag: 'إعلان رقمي بلا حدود. إعلانات خارجية في الكويت.',
      rights: 'جميع الحقوق محفوظة.'
    }
  };

  const SCREENS = [
    { ver: 'X',   yt: 'Jj14fRwLpO0', tag: 'tagFlag',   name: { en: 'Hive X',   ar: 'هايف X' },   d: { en: "Kuwait's largest digital screen, in the heart of Kuwait City.", ar: 'أكبر شاشة رقمية في الكويت، في قلب مدينة الكويت.' } },
    { ver: '5.0', yt: 'OojT7wJA60Q', tag: 'tagScreen', name: { en: 'Hive 5.0', ar: 'هايف 5.0' }, d: { en: 'The latest in the series, setting new standards in digital advertising.', ar: 'أحدث السلسلة، بمعايير جديدة في الإعلان الرقمي.' } },
    { ver: '4.0', yt: 'bGDBmFTmqnU', tag: 'tagScreen', name: { en: 'Hive 4.0', ar: 'هايف 4.0' }, d: { en: 'Advanced digital advertising, reaching new heights in innovation and impact.', ar: 'حلول إعلانية رقمية متقدمة بابتكار وتأثير أعلى.' } },
    { ver: '3.0', yt: '6vfGlmXNqzc', tag: 'tagScreen', name: { en: 'Hive 3.0', ar: 'هايف 3.0' }, d: { en: 'Next-generation advertising technology.', ar: 'الجيل الجديد من تقنيات الإعلان.' } },
    { ver: '1.0', yt: 'HbpK5eIsTPs', tag: 'tagScreen', name: { en: 'Hive 1.0', ar: 'هايف 1.0' }, d: { en: 'Our first major launch, with 3D content that jumps off the screen.', ar: 'أول إطلاق كبير لنا، بمحتوى ثلاثي الأبعاد يخرج من الشاشة.' } },
    { ver: '↑',   yt: 'kjsVL5wfoH8', tag: 'tagFilm',   name: { en: 'From above', ar: 'من الأعلى' }, d: { en: 'Drone footage of our digital screens across strategic locations.', ar: 'تصوير جوي لشاشاتنا الرقمية في مواقع استراتيجية.' }, clip: 'assets/media/hero-m.mp4' }
  ];

  let lang = store.get('hive-lang') || ((navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en');
  if (!T[lang]) lang = 'en';
  const t = k => T[lang][k];

  /* ======================================================================
     2. Marquee
     ====================================================================== */
  /* run work when the browser has a free moment, never before the first paint */
  const idle = (fn) => {
    const go = () => {
      if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: 2500 });
      else setTimeout(fn, 200);
    };
    /* never compete with the first paint or with the images the page needs */
    if (document.readyState === 'complete') go();
    else addEventListener('load', go, { once: true });
  };

  const marquee = (() => {
    const track = $('#marquee-track');
    const build = () => {
      if (!track) return;
      const items = t('ticker');
      const one = items.map(x => `<span class="marquee-item"><b>⬢</b>${x}</span>`).join('');
      track.innerHTML = one + one + one + one;
      built = true;
    };
    let built = false;
    if (track && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => {
        if (es[0].isIntersecting && !built) { build(); io.disconnect(); }
      }, { rootMargin: '400px' });
      io.observe(track);
    }
    return { build: () => { if (!built) build(); } };
  })();

  /* ======================================================================
     3. Hero rotator
     ====================================================================== */
  const rot = (() => {
    const box = $('#rot-lines'), bars = $('#rot-bars');
    let at = 0, timer = 0;
    const paint = () => {
      const lines = t('rot');
      box.innerHTML = lines.map((l, i) => `<p${i === 0 ? ' class="is-on"' : ''}>${l}</p>`).join('');
      bars.innerHTML = lines.map((_, i) => `<i${i === 0 ? ' class="is-on"' : ''}></i>`).join('');
    };
    const step = () => {
      const ps = $$('p', box), bs = $$('i', bars);
      if (!ps.length) return;
      ps[at].classList.remove('is-on');
      bs[at].classList.remove('is-on');
      at = (at + 1) % ps.length;
      ps[at].classList.add('is-on');
      bs[at].classList.add('is-on');
    };
    const start = () => {
      clearInterval(timer);
      if (reduce) return;
      timer = setInterval(() => { if (!document.hidden) step(); }, 5200);
    };
    return { paint, start, reset() { at = 0; paint(); start(); } };
  })();

  /* ======================================================================
     4. Screens tabs
     ====================================================================== */
  const stage = (() => {
    const tabs = $('#tabs'), img = $('#stage-img'), clip = $('#stage-clip'),
          name = $('#stage-name'), desc = $('#stage-desc'), tag = $('#stage-tag'),
          link = $('#stage-link'), watch = $('#stage-watch');
    let current = 0;

    const build = () => {
      if (!tabs) return;
      tabs.innerHTML = SCREENS.map((s, i) => `
        <button class="tab" role="tab" id="tab-${i}" aria-controls="stage-panel" aria-selected="${i === current}" tabindex="${i === current ? 0 : -1}">
          <small>${s.ver === '↑' ? t('tagFilm') : (s.ver === 'X' ? t('tagFlag') : 'Hive')}</small>
          <span>${s.name[lang]}</span>
        </button>`).join('');
      $$('.tab', tabs).forEach((b, i) => {
        b.addEventListener('click', () => select(i, true));
        b.addEventListener('keydown', e => {
          const n = SCREENS.length;
          let next = -1;
          if (e.key === 'ArrowRight') next = (i + 1) % n;
          else if (e.key === 'ArrowLeft') next = (i - 1 + n) % n;
          else if (e.key === 'Home') next = 0;
          else if (e.key === 'End') next = n - 1;
          if (next < 0) return;
          e.preventDefault();
          select(next, true);
          $$('.tab', tabs)[next].focus();
        });
      });
      paint();
      built = true;
    };
    let built = false;
    if (tabs && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => {
        if (es[0].isIntersecting && !built) { build(); io.disconnect(); }
      }, { rootMargin: '400px' });
      io.observe(tabs.closest('section') || tabs.parentElement || tabs);
    }

    const paint = () => {
      const s = SCREENS[current];
      const url = 'https://www.youtube.com/watch?v=' + s.yt;
      link.href = url; watch.href = url;
      name.textContent = s.name[lang];
      desc.textContent = s.d[lang];
      tag.textContent = t(s.tag);
      $$('.tab', tabs).forEach((b, i) => {
        b.setAttribute('aria-selected', String(i === current));
        b.tabIndex = i === current ? 0 : -1;
      });
      const panel = $('#stage-panel');
      if (panel) panel.setAttribute('aria-labelledby', 'tab-' + current);
      if (s.clip) {
        img.hidden = true;
        clip.hidden = false;
        if (clip.getAttribute('src') !== s.clip) { clip.src = s.clip; clip.load(); }
        if (!reduce) clip.play().catch(() => {});
      } else {
        clip.pause(); clip.hidden = true;
        img.hidden = false;
        if (clip.getAttribute('src')) { clip.removeAttribute('src'); clip.load(); }
        const next = `assets/stills/${s.yt}.webp`;
        if (img.getAttribute('src') !== next) img.src = next;
        img.alt = '';
      }
    };

    const select = (i, focus) => { current = i; paint(); };

    /* swipe the stage to move through the screens */
    const shot = $('#stage-link');
    if (shot) {
      let sx = 0, sy = 0, down = false, dragging = false;
      shot.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        down = true; dragging = false; sx = e.clientX; sy = e.clientY;
      });
      shot.addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        if (!dragging && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          dragging = true;
          shot.classList.add('is-dragging');
        }
      });
      const end = (e, cancelled) => {
        if (!down) return;
        down = false;
        shot.classList.remove('is-dragging');
        const dx = e.clientX - sx, dy = e.clientY - sy;
        if (cancelled || !dragging || Math.abs(dx) < 55 || Math.abs(dy) > Math.abs(dx)) return;
        let dir = dx < 0 ? 1 : -1;
        if (root.dir === 'rtl') dir = -dir;
        select((current + dir + SCREENS.length) % SCREENS.length, true);
        shot.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); }, { once: true, capture: true });
      };
      shot.addEventListener('pointerup', e => end(e, false));
      shot.addEventListener('pointercancel', e => end(e, true));
      shot.addEventListener('dragstart', e => e.preventDefault());
    }

    return { build, paint, select };
  })();

  /* ======================================================================
     5. Brand simulator on Hive X
     ====================================================================== */
  const sim = (() => {
    const c = $('#sim'), wrap = $('#hx-stage'), img = $('#hx-img'), input = $('#brand'),
          clear = $('#sim-clear'), count = $('#sim-count'), status = $('#sim-status');
    if (!c || !wrap || !img || !input) return { layout() {}, refresh() {} };

    const x = c.getContext('2d');
    const COLS = 92, ROWS = 50, CELL = 12;           // internal 1104 x 600, displayed at 552 x 300
    const W = COLS * CELL, H = ROWS * CELL;
    const CW = 552, CH = 300;                        // CSS box the transform maps from
    let sized = false;
    const ensure = () => { if (!sized) { c.width = W; c.height = H; sized = true; } };

    /* corners of the screen inside the 720 x 1280 photo */
    const QUAD = [[218, 307], [506, 269], [506, 471], [218, 484]];

    const LEDS = {
      gold: { dot: '#F8C41C', hot: '#FFF7D8' },
      ice:  { dot: '#8FE6FF', hot: '#EAFDFF' },
      rose: { dot: '#FF7AC2', hot: '#FFE6F5' }
    };
    const sws = $$('.sw', wrap.parentNode), modeBtn = $('#sim-mode');
    let mask = null, maskW = COLS, live = false, visible = false, raf = 0, demo = true;
    let led = 'gold', motion = false, shift = 0, lastT = 0;

    const solve = (A, b) => {
      const n = 8;
      for (let i = 0; i < n; i++) {
        let p = i;
        for (let r = i + 1; r < n; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
        [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
        for (let r = i + 1; r < n; r++) {
          const f = A[r][i] / A[i][i];
          b[r] -= f * b[i];
          for (let k = i; k < n; k++) A[r][k] -= f * A[i][k];
        }
      }
      const o = new Array(n);
      for (let i = n - 1; i >= 0; i--) {
        let v = b[i];
        for (let k = i + 1; k < n; k++) v -= A[i][k] * o[k];
        o[i] = v / A[i][i];
      }
      return o;
    };

    const layout = () => {
      const w = img.clientWidth;
      if (!w) return;
      ensure();
      const s = w / 720;
      const q = QUAD.map(([px, py]) => [px * s, py * s]);
      const [q0, q1, q2, q3] = q;

      /* an affine fit that always covers the panel, then clip to the real shape:
         the browser flattens the 4x4 matrix, so the clip keeps the perspective edge exact */
      const a = (q1[0] - q0[0]) / CW;
      const b = (q1[1] - q0[1]) / CW;
      const d = (q2[1] - q1[1]) / CH;
      const e = q0[0];
      const f = q0[1];
      c.style.transform = `matrix(${a},${b},0,${d},${e},${f})`;

      if (!a || !d) return;
      /* invert x' = a*x + e, y' = b*x + d*y + f */
      const local = [q0, q1, q2, q3].map(([X, Y]) => {
        const dx = X - e, dy = Y - f;
        return `${(dx / a).toFixed(2)}px ${((dy - (b / a) * dx) / d).toFixed(2)}px`;
      });
      c.style.clipPath = `polygon(${local.join(', ')})`;
      c.style.webkitClipPath = c.style.clipPath;
    };

    const makeMask = (text) => {
      /* two copies side by side, so the message can run as a ticker */
      const MW = COLS * 2;
      const m = document.createElement('canvas');
      m.width = MW; m.height = ROWS;
      const g = m.getContext('2d', { willReadFrequently: true });
      let fs = ROWS * 0.42;
      const font = (size) => `700 ${size}px "Inter Tight", Inter, Arial, sans-serif`;
      g.font = font(fs);
      const measured = g.measureText(text).width;
      if (measured > COLS * 0.86) { fs *= (COLS * 0.86) / measured; g.font = font(fs); }
      g.fillStyle = '#fff';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.direction = 'ltr';
      g.fillText(text, COLS / 2, ROWS / 2 + fs * 0.04);
      g.fillText(text, COLS * 1.5, ROWS / 2 + fs * 0.04);
      maskW = MW;
      return g.getImageData(0, 0, MW, ROWS).data;
    };

    const paint = (now = 0) => {
      x.clearRect(0, 0, W, H);
      if (!mask) return;
      /* the panel reads as a real screen: dark glass first, then lit dots */
      x.fillStyle = '#06060A';
      x.fillRect(0, 0, W, H);
      const vg = x.createLinearGradient(0, 0, 0, H);
      vg.addColorStop(0, 'rgba(20,18,14,.9)');
      vg.addColorStop(.5, 'rgba(8,8,10,.96)');
      vg.addColorStop(1, 'rgba(4,4,6,1)');
      x.fillStyle = vg;
      x.fillRect(0, 0, W, H);
      if (motion) {
        if (lastT) shift += Math.min(80, now - lastT) * 0.021;
        lastT = now;
      } else { lastT = 0; }
      const off = ((Math.round(shift) % maskW) + maskW) % maskW;

      const band = reduce ? -999 : ((now / 1000 * 0.55) % 1.6 - 0.3) * COLS;
      const pal = LEDS[led] || LEDS.gold;
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < COLS; i++) {
          const a = mask[(j * maskW + ((i + off) % maskW)) * 4 + 3];
          if (a < 80) continue;
          const hot = Math.abs(i - band) < 5;
          x.globalAlpha = Math.min(1, a / 180) * (hot ? 1 : 0.86);
          x.fillStyle = hot ? pal.hot : pal.dot;
          x.fillRect(i * CELL + 1.5, j * CELL + 1.5, CELL - 3, CELL - 3);
        }
      }
      x.globalAlpha = 1;
    };

    const loop = (now) => {
      if (!live) return;
      paint(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (live || !visible) return;
      if (reduce) { paint(0); return; }
      live = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => { live = false; cancelAnimationFrame(raf); };

    const syncMotion = () => {
      if (!modeBtn) return;
      modeBtn.setAttribute('aria-pressed', String(motion));
      modeBtn.textContent = t(motion ? 'simMoving' : 'simStill');
    };

    const setLed = (name, announce) => {
      if (!LEDS[name]) return;
      led = name;
      sws.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.led === name)));
      wrap.style.setProperty('--led', LEDS[name].dot);
      if (!live) paint(0);
      if (announce && status) {
        const b = sws.filter(n => n.dataset.led === name)[0];
        status.textContent = b ? b.getAttribute('aria-label') : '';
      }
    };

    sws.forEach(b => b.addEventListener('click', () => setLed(b.dataset.led, true)));
    if (modeBtn) {
      if (reduce) modeBtn.hidden = true;
      else modeBtn.addEventListener('click', () => {
        motion = !motion;
        shift = 0; lastT = 0;
        syncMotion();
        if (status) status.textContent = t(motion ? 'simMoving' : 'simStill');
        if (live) paint(performance.now()); else start();
      });
    }
    syncMotion();
    setLed('gold', false);

    const refresh = (announce) => {
      if (!sized) return;
      const v = input.value.trim();
      const text = v || t('simDemo');
      mask = makeMask(text.toUpperCase());
      c.classList.add('is-on');
      if (clear) clear.hidden = !v;
      if (count) count.textContent = `${v.length}/18`;
      if (!live) paint(0);
      if (announce && status) status.textContent = v ? t('simSet') + v : '';
      syncMotion();
    };

    input.addEventListener('input', () => refresh(false));
    if (clear) clear.addEventListener('click', () => { input.value = ''; refresh(false); input.focus(); });

    if ('IntersectionObserver' in window) {
      let tries = 0;
      const enter = () => {
        layout();
        if (!sized && tries++ < 10) { requestAnimationFrame(enter); return; }
        start();
      };
      new IntersectionObserver((es) => {
        visible = es[0].isIntersecting;
        if (visible) enter(); else stop();
      }, { rootMargin: '120px' }).observe(wrap);
    } else { visible = true; }

    if (img.complete) layout(); else img.addEventListener('load', layout);

    return { layout, refresh, stop, reflow() { if (sized) layout(); } };
  })();

  /* ======================================================================
     6. Globe
     ====================================================================== */
  const globe = (() => {
    const cv = $('#globe');
    if (!cv) return { resize() {}, redraw() {}, start() {}, reflow() {} };
    const g = cv.getContext('2d');
    const D = Math.PI / 180;
    const HOME = { lon: 47.98, lat: 29.38, en: 'Kuwait', ar: 'الكويت' };

    /* coarse land outlines (lon, lat) */
    const POLY = [
      [[-17,21],[-16,28],[-10,35],[-5,36],[10,37],[11,33],[20,32],[25,32],[32,31],[34,31],[34,28],[38,18],[43,12],[51,12],[45,2],[40,-5],[40,-15],[35,-24],[32,-29],[27,-34],[20,-35],[18,-30],[14,-22],[12,-13],[13,-6],[9,-1],[9,4],[5,5],[-4,5],[-8,4],[-13,8],[-17,14]],
      [[34,28],[35,30],[36,35],[39,32],[48,30],[50,26],[51,24],[56,26],[57,23],[59,22],[55,17],[52,16],[45,13],[43,13],[39,21],[36,26]],
      [[-9,37],[-9,43],[-2,43.5],[-1,46],[-4.5,48],[2,51],[6,53],[8,55],[10,57.5],[12,56],[14,55],[20,55],[22,58],[24,60],[22,62],[25,65],[21,64],[17,61],[19,60],[16,57],[12,58],[10,59],[5,58],[5,62],[14,67],[20,70],[28,71],[40,67],[44,68],[60,70],[70,73],[80,73],[100,77],[110,76],[140,72],[160,70],[180,68],[180,64],[165,60],[156,51],[142,59],[137,54],[141,47],[135,43],[129,42],[128,35],[126,37],[122,40],[121,37],[122,31],[120,25],[117,23],[110,21],[108,21],[106,17],[109,12],[105,9],[103,1.5],[101,3],[98,8],[98,16],[94,17],[92,22],[88,22],[80,16],[80,10],[77,8],[73,16],[72,21],[67,25],[62,25],[57,26],[54,27],[50,30],[48,30],[44,33],[39,32],[36,36],[33,36],[30,36.5],[27,37],[26,40],[23,40],[24,38],[22,37],[21,39],[19.5,42],[15,45],[13,45.5],[12.5,44],[16,41],[18,40],[16,38],[15.5,38],[12,42],[10,44],[7,43.5],[3,43],[3,42],[0,39],[-1,37],[-5,36],[-6,36.5]],
      [[-5,50],[1,51],[2,53],[-1,55],[-2,57],[-3,58.5],[-5,58],[-6,56],[-5,54.5],[-3,54],[-4.5,52],[-5,51.5]],[[-10,52],[-6,52],[-6,55],[-8,55],[-10,54]],
      [[130,31],[132,34],[136,35],[140,36],[141,41],[141,45],[144,44],[141,39],[140,35],[135,33]],
      [[95,5],[98,4],[106,-6],[104,-5],[100,0]],[[109,1],[117,7],[119,1],[116,-4],[110,-3]],[[105,-6],[114,-7],[114,-8.5],[106,-7]],
      [[131,-1],[141,-3],[150,-10],[141,-9],[137,-5]],[[44,-25],[47,-25],[50,-15],[49,-12],[44,-17]],
      [[114,-22],[114,-34],[118,-35],[124,-34],[131,-31],[138,-35],[141,-38],[146,-39],[150,-37],[153,-28],[153,-25],[146,-19],[142,-11],[141,-17],[136,-12],[130,-12],[126,-14],[122,-18]],
      [[-168,66],[-162,70],[-140,70],[-125,70],[-110,73],[-95,72],[-85,70],[-80,63],[-94,60],[-92,57],[-82,55],[-79,52],[-77,60],[-73,62],[-65,60],[-62,55],[-56,52],[-60,47],[-66,44],[-70,42],[-74,40],[-76,35],[-81,31],[-80,25],[-82,27],[-84,30],[-89,30],[-94,29],[-97,26],[-97,22],[-94,18],[-88,21],[-87,16],[-83,15],[-83,10],[-79,9],[-80,8],[-85,11],[-92,14],[-96,16],[-105,20],[-110,24],[-112,29],[-110,23],[-114,30],[-117,32],[-121,35],[-124,40],[-124,48],[-130,55],[-138,59],[-148,60],[-155,58],[-165,54],[-160,59],[-165,62]],
      [[-55,60],[-43,60],[-35,66],[-20,70],[-18,77],[-30,83],[-60,82],[-70,77],[-58,75],[-52,69]],
      [[-80,9],[-77,8],[-72,12],[-62,11],[-52,5],[-50,0],[-44,-2],[-35,-5],[-35,-9],[-39,-14],[-41,-22],[-48,-26],[-53,-34],[-58,-35],[-57,-38],[-65,-41],[-65,-46],[-68,-50],[-69,-55],[-74,-52],[-74,-45],[-73,-38],[-71,-30],[-70,-18],[-76,-14],[-81,-6],[-80,-1],[-77,4],[-78,7]]
    ];

    /* one bounding box per land mass: most grid points are rejected by this
       test alone, which is what makes building the mask cheap */
    const BOX = POLY.map(pts => {
      let x0 = 180, x1 = -180, y0 = 90, y1 = -90;
      for (const [x, y] of pts) {
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
      return [x0, y0, x1, y1];
    });
    const inBox = (i, px, py) => {
      const b = BOX[i];
      return px >= b[0] && px <= b[2] && py >= b[1] && py <= b[3];
    };

    const inPoly = (px, py, pts) => {
      let c = false;
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const [xi, yi] = pts[i], [xj, yj] = pts[j];
        if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) c = !c;
      }
      return c;
    };

    const fk = HOME.lat * D, lk = HOME.lon * D;
    const K = [Math.cos(fk) * Math.cos(lk), Math.cos(fk) * Math.sin(lk), Math.sin(fk)];
    const E = [-Math.sin(lk), Math.cos(lk), 0];
    const N = [-Math.sin(fk) * Math.cos(lk), -Math.sin(fk) * Math.sin(lk), Math.cos(fk)];
    /* the land mask is ~29k point-in-polygon tests; it is only worth doing
       once the map is actually on screen, so it is built on first use. */
    let dots = null;
    const buildDots = () => {
      if (dots) return;
      dots = [];
      for (let lat = -56; lat <= 80; lat += 1.7) {
        const st = 1.7 / Math.max(0.25, Math.cos(lat * D));
        for (let lon = -180; lon < 180; lon += st) {
          if (POLY.some((p, i) => inBox(i, lon, lat) && inPoly(lon, lat, p))) {
            const f = lat * D, l = lon * D;
            dots.push([Math.sin(f), Math.cos(f), l]);
          }
        }
      }
    };

    let size = 0, lam = HOME.lon - 8, phi = 21, vel = 0, drag = false, lx = 0, ly = 0,
        idle = 0, live = false, visible = false, born = 0, raf = 0;

    const resize = () => {
      const r = cv.getBoundingClientRect();
      if (!r.width) return;
      buildDots();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      size = r.width;
      if (!size) return;
      cv.width = Math.round(size * dpr);
      cv.height = Math.round(size * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const hexAt = (px, py, r) => {
      g.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3;
        g[i ? 'lineTo' : 'moveTo'](px + r * Math.cos(a), py + r * Math.sin(a));
      }
      g.closePath();
    };

    const draw = (now) => {
      if (!size) return;
      const tm = now / 1000;
      const intro = reduce ? 1 : clamp((now - born) / 2200, 0, 1);
      const ease = 1 - Math.pow(1 - intro, 3);
      const R = size * 0.355 * (0.9 + 0.1 * ease);
      const cx = size / 2, cy = size / 2;
      const l0 = (lam - (1 - ease) * 140) * D, f0 = phi * D;
      const s0 = Math.sin(f0), c0 = Math.cos(f0);
      const P = (f, l, h) => {
        const cf = Math.cos(f), sf = Math.sin(f), dl = l - l0, cd = Math.cos(dl);
        return [cx + R * h * cf * Math.sin(dl), cy - R * h * (c0 * sf - s0 * cf * cd), s0 * sf + c0 * cf * cd];
      };

      g.clearRect(0, 0, size, size);
      g.direction = 'ltr';

      /* atmosphere */
      let gr = g.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.5);
      gr.addColorStop(0, 'rgba(248,196,28,.18)');
      gr.addColorStop(0.4, 'rgba(248,196,28,.06)');
      gr.addColorStop(1, 'rgba(248,196,28,0)');
      g.fillStyle = gr;
      g.beginPath(); g.arc(cx, cy, R * 1.5, 0, 7); g.fill();

      /* sphere */
      gr = g.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.06, cx, cy, R);
      gr.addColorStop(0, '#1d1b16');
      gr.addColorStop(0.62, '#0d0d0b');
      gr.addColorStop(1, '#060606');
      g.fillStyle = gr;
      g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill();

      /* rim */
      g.strokeStyle = 'rgba(248,196,28,.42)';
      g.lineWidth = 1;
      g.beginPath(); g.arc(cx, cy, R, 0, 7); g.stroke();

      /* graticule */
      g.strokeStyle = 'rgba(245,242,235,.10)';
      g.lineWidth = 0.7;
      for (let lo = 0; lo < 360; lo += 30) {
        g.beginPath();
        let pen = false;
        for (let la = -84; la <= 84; la += 6) {
          const [px, py, z] = P(la * D, lo * D, 1);
          if (z > 0) { pen ? g.lineTo(px, py) : g.moveTo(px, py); pen = true; } else pen = false;
        }
        g.stroke();
      }
      for (let la = -60; la <= 60; la += 30) {
        g.beginPath();
        let pen = false;
        for (let lo = 0; lo <= 360; lo += 6) {
          const [px, py, z] = P(la * D, lo * D, 1);
          if (z > 0) { pen ? g.lineTo(px, py) : g.moveTo(px, py); pen = true; } else pen = false;
        }
        g.stroke();
      }

      /* land dots */
      const dot = Math.max(1.5, size / 300);
      for (const [sf, cf, l] of dots) {
        const dl = l - l0, cd = Math.cos(dl);
        const z = s0 * sf + c0 * cf * cd;
        if (z <= 0) continue;
        const px = cx + R * cf * Math.sin(dl);
        const py = cy - R * (c0 * sf - s0 * cf * cd);
        g.globalAlpha = 0.18 + 0.62 * z;
        g.fillStyle = '#F8C41C';
        g.fillRect(px - dot / 2, py - dot / 2, dot, dot);
      }
      g.globalAlpha = 1;

      /* ripples from Kuwait */
      g.strokeStyle = '#F8C41C';
      g.lineWidth = 1.1;
      for (let k = 0; k < 3; k++) {
        const pr = reduce ? (k + 1) / 3.4 : ((tm / 3.8 + k / 3) % 1);
        const rho = pr * 42 * D, cr = Math.cos(rho), sr = Math.sin(rho);
        g.beginPath();
        let pen = false;
        for (let i = 0; i <= 60; i++) {
          const a = i / 60 * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
          const vx = cr * K[0] + sr * (ca * E[0] + sa * N[0]);
          const vy = cr * K[1] + sr * (ca * E[1] + sa * N[1]);
          const vz = cr * K[2] + sr * (ca * E[2] + sa * N[2]);
          const [px, py, z] = P(Math.asin(clamp(vz, -1, 1)), Math.atan2(vy, vx), 1.004);
          if (z > 0) { pen ? g.lineTo(px, py) : g.moveTo(px, py); pen = true; } else pen = false;
        }
        g.globalAlpha = (1 - pr) * 0.7;
        g.stroke();
      }
      g.globalAlpha = 1;

      /* beacon */
      const [hx, hy, hz] = P(fk, lk, 1);
      if (hz > 0) {
        g.fillStyle = '#F8C41C';
        g.globalAlpha = 0.18; hexAt(hx, hy, Math.max(12, size / 26)); g.fill();
        g.globalAlpha = 1; hexAt(hx, hy, Math.max(5, size / 62)); g.fill();
        g.strokeStyle = 'rgba(248,196,28,.5)';
        g.lineWidth = 1;
        g.beginPath(); g.arc(hx, hy, Math.max(16, size / 20), 0, 7); g.stroke();
        g.fillStyle = '#F5F2EB';
        g.font = `600 ${Math.max(10, size / 46)}px "Inter Tight", Arial, sans-serif`;
        g.textAlign = 'start';
        g.textBaseline = 'middle';
        g.fillText(HOME[lang], hx + Math.max(16, size / 22), hy);
      }
      g.globalAlpha = 1;
    };

    const loop = (now) => {
      if (!live) return;
      if (!drag) {
        if (Math.abs(vel) > 0.02) { lam += vel; vel *= 0.94; idle = now; }
        else if (!reduce && now - idle > 1800) {
          const target = HOME.lon - 8 + Math.sin(now / 6400) * 22;
          lam += (((target - lam + 540) % 360) - 180) * 0.018;
          phi += (21 - phi) * 0.018;
        }
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    let tries = 0;
    const start = () => {
      if (live || !visible) return;
      if (!size) {
        resize();
        if (!size && tries++ < 12) { requestAnimationFrame(start); return; }
      }
      if (!born) born = performance.now();
      if (reduce) { draw(performance.now()); return; }
      live = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => { live = false; cancelAnimationFrame(raf); };

    cv.addEventListener('pointerdown', e => {
      drag = true; lx = e.clientX; ly = e.clientY; vel = 0;
      try { cv.setPointerCapture(e.pointerId); } catch (_) {}
    });
    cv.addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY;
      const k = 180 / (size * 0.9);
      lam -= dx * k; phi = clamp(phi + dy * k, -32, 62); vel = -dx * k;
    });
    const end = () => { drag = false; idle = performance.now(); };
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    cv.addEventListener('pointerleave', () => { if (drag) end(); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(es => {
        visible = es[0].isIntersecting;
        if (visible) start(); else stop();
      }, { rootMargin: '0px' }).observe(cv);
    } else { visible = true; start(); }

    return { resize, start, reflow() { if (size) resize(); }, redraw() { if (!live && size) draw(performance.now()); } };
  })();

  /* ======================================================================
     7. Language
     ====================================================================== */
  const applyLang = (initial) => {
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';

    /* the document ships English, so the first pass has nothing to rewrite */
    if (!(initial && lang === 'en')) {
      $$('[data-i18n]').forEach(n => {
        const v = t(n.dataset.i18n);
        if (typeof v === 'string') n.innerHTML = v;
      });
      $$('[data-i18n-ph]').forEach(n => { n.placeholder = t(n.dataset.i18nPh); });
      $$('[data-i18n-aria]').forEach(n => { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
    }

    const lb = $('#lang-btn');
    if (lb) { lb.textContent = t('langBtn'); lb.setAttribute('aria-label', t('langLabel')); }
    const burger = $('#burger');
    if (burger) burger.setAttribute('aria-label', t(burger.getAttribute('aria-expanded') === 'true' ? 'close' : 'menu'));
    paintTheme(isLight() ? 'light' : 'dark');

    if (initial) {
      /* nothing below the fold is built before it is needed: the ticker and the
         screen tabs build when their sections come close, the hero lines build now */
      rot.reset();
    } else {
      marquee.build();
      rot.reset();
      stage.build();
      sim.refresh(false);
      sim.layout();
      globe.redraw();
    }
  };

  const langBtn = $('#lang-btn');
  if (langBtn) langBtn.addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    store.set('hive-lang', lang);
    applyLang();
  });

  /* ======================================================================
     7b. Theme
     ====================================================================== */
  const themeBtn = $('#theme-btn');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const isLight = () => root.getAttribute('data-theme') === 'light';

  const paintTheme = (mode) => {
    if (mode === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    if (themeBtn) {
      const light = mode === 'light';
      themeBtn.setAttribute('aria-pressed', light ? 'true' : 'false');
      themeBtn.title = light ? t('themeDark') : t('themeLight');
    }
    if (themeMeta) themeMeta.setAttribute('content', mode === 'light' ? '#F5F1E9' : '#08080A');
  };

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = isLight() ? 'dark' : 'light';
      store.set('hive-theme', next);
      if (!reduce) {
        root.classList.add('theme-anim');
        clearTimeout(paintTheme.t);
        paintTheme.t = setTimeout(() => root.classList.remove('theme-anim'), 640);
      }
      paintTheme(next);
      sim.layout();
    });
  }

  /* ======================================================================
     8. Nav, menu, reveal, counters, chrome
     ====================================================================== */
  const nav = $('#nav');
  const burger = $('#burger');
  const menu = $('#menu');
  let menuOpen = false;

  const setMenu = (open) => {
    if (!menu || !burger) return;
    menuOpen = open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', t(open ? 'close' : 'menu'));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      const first = $('.menu-links a', menu);
      if (first) first.focus({ preventScroll: true });
    } else {
      menu.classList.remove('is-open');
      const done = () => { menu.hidden = true; };
      if (reduce) done(); else setTimeout(done, 420);
      burger.focus({ preventScroll: true });
    }
  };
  if (burger) burger.addEventListener('click', () => setMenu(!menuOpen));
  if (menu) {
    $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menuOpen) setMenu(false);
      if (e.key === 'Tab' && menuOpen) {
        const f = $$('a,button', menu).filter(n => n.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    matchMedia('(min-width: 980px)').addEventListener('change', e => { if (e.matches && menuOpen) setMenu(false); });
  }

  /* scroll chrome */
  const bar = $('#progress');
  const toTop = $('#to-top');
  let ticking = false, lastY = scrollY;
  const setTop = (on) => {
    if (!toTop) return;
    toTop.classList.toggle('is-on', on);
    toTop.tabIndex = on ? 0 : -1;
    if (on) toTop.removeAttribute('aria-hidden');
    else toTop.setAttribute('aria-hidden', 'true');
  };
  /* the document height is measured on resize and when content settles, never
     inside the scroll handler: reading it there forces a full re-layout per frame */
  let maxScroll = 0;
  const measure = () => { maxScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight); };
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
  addEventListener('resize', measure, { passive: true });
  addEventListener('load', measure);

  const onScroll = () => {
    ticking = false;
    const y = scrollY;
    const max = maxScroll;
    if (bar) bar.style.setProperty('--sp', max > 0 ? (y / max).toFixed(4) : '0');
    if (nav) {
      nav.classList.toggle('is-stuck', y > 24);
      const down = y > lastY + 5, up = y < lastY - 5;
      if (y > 520 && down && !menuOpen) nav.classList.add('is-hidden');
      else if (up || y < 140 || menuOpen) nav.classList.remove('is-hidden');
    }
    setTop(y > innerHeight * 1.15);
    lastY = y;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  measure();
  onScroll();

  /* active nav */
  const links = $$('.nav-links a');
  if (links.length && 'IntersectionObserver' in window) {
    const map = new Map();
    links.forEach(a => {
      const sec = document.getElementById(a.dataset.nav);
      if (sec) map.set(sec, a);
    });
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.remove('is-active'));
        const a = map.get(e.target);
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, sec) => io.observe(sec));
  }

  /* reveal */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        $$('[data-count]', e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(n => io.observe(n));
  } else {
    revealEls.forEach(n => n.classList.add('is-in'));
  }

  /* counters */
  const counted = new WeakSet();
  function countUp(node) {
    if (counted.has(node)) return;
    counted.add(node);
    const to = parseInt(node.dataset.count, 10);
    if (!to) return;
    if (reduce) { node.textContent = String(to); return; }
    const t0 = performance.now(), dur = 1400;
    const step = (now) => {
      const q = clamp((now - t0) / dur, 0, 1);
      node.textContent = String(Math.round(to * (1 - Math.pow(1 - q, 3))));
      if (q < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* copy */
  $$('.copy').forEach(btn => {
    btn.addEventListener('click', async () => {
      const src = document.getElementById(btn.dataset.copy);
      if (!src) return;
      const value = src.textContent.trim();
      const done = () => {
        btn.classList.add('is-done');
        const label = btn.textContent;
        btn.textContent = t('copied');
        setTimeout(() => { btn.classList.remove('is-done'); btn.textContent = label; }, 1700);
      };
      try {
        await navigator.clipboard.writeText(value);
        done();
      } catch (e) {
        const r = document.createRange();
        r.selectNodeContents(src);
        const s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
        done();
      }
    });
  });

  /* clock */
  const clocks = [$('#kw-time'), $('#kw-time-2')];
  const tick = () => {
    let v = '';
    try {
      v = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kuwait', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).format(new Date());
    } catch (e) { v = '--:--'; }
    clocks.forEach(c => { if (c) c.textContent = v; });
  };
  tick();
  setInterval(tick, 20000);

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* magnetic buttons */
  if (fine && !reduce) {
    $$('.btn').forEach(btn => {
      let raf2 = 0;
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / r.width;
        const dy = (e.clientY - r.top - r.height / 2) / r.height;
        cancelAnimationFrame(raf2);
        raf2 = requestAnimationFrame(() => {
          btn.style.transform = `translate(${(dx * 6).toFixed(2)}px, ${(dy * 4).toFixed(2)}px)`;
        });
      });
      btn.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf2);
        btn.style.transform = '';
      });
    });
  }

  /* hero film */
  const film = $('#hero-video');
  const hero = $('#hero');
  if (film && hero) {
    const wide = matchMedia('(min-width: 900px)').matches;
    const conn = navigator.connection || {};
    const light = !conn.saveData && !/(^|-)2g$/.test(conn.effectiveType || '');
    if (wide && light && !reduce) {
      film.src = 'assets/media/hero.mp4';
      film.addEventListener('playing', () => film.classList.add('is-on'), { once: true });
      const play = () => film.play().catch(() => {});
      film.addEventListener('canplay', play, { once: true });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(es => {
          if (es[0].isIntersecting) play(); else film.pause();
        }, { threshold: 0.02 }).observe(hero);
      }
      setTimeout(() => film.load(), 700);
    }
  }

  /* hero headline in */
  const h1 = $('.hero-h1');
  if (h1) requestAnimationFrame(() => setTimeout(() => h1.classList.add('is-in'), 120));

  /* ======================================================================
     10. Live layer — pointer light, lean, sheen
     ====================================================================== */
  if (!reduce) {
    const track = (el, tilt) => {
      let raf = 0;
      el.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch') return;
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const nx = ((e.clientX - r.left) / r.width - .5) * 2;
        const ny = ((e.clientY - r.top) / r.height - .5) * 2;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--mx', (50 + nx * 50).toFixed(1) + '%');
          el.style.setProperty('--my', (50 + ny * 50).toFixed(1) + '%');
          if (tilt) {
            el.style.setProperty('--tx', nx.toFixed(3));
            el.style.setProperty('--ty', ny.toFixed(3));
          }
        });
      }, { passive: true });
      el.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        if (!tilt) return;
        el.style.setProperty('--tx', '0');
        el.style.setProperty('--ty', '0');
      });
    };

    const heroEl = $('#hero');
    if (heroEl) {
      let raf = 0;
      heroEl.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') heroEl.classList.add('has-pointer'); });
      heroEl.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch') return;
        const r = heroEl.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width - .5) * 2;
        const ny = ((e.clientY - r.top) / r.height - .5) * 2;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          heroEl.style.setProperty('--mx', (50 + nx * 50).toFixed(1) + '%');
          heroEl.style.setProperty('--my', (50 + ny * 50).toFixed(1) + '%');
          heroEl.style.setProperty('--px', nx.toFixed(3));
          heroEl.style.setProperty('--py', ny.toFixed(3));
        });
      }, { passive: true });
      heroEl.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        heroEl.classList.remove('has-pointer');
        heroEl.style.setProperty('--px', '0');
        heroEl.style.setProperty('--py', '0');
      });
    }

    $$('.chapter').forEach(el => track(el, true));
    $$('.format').forEach(el => track(el, false));
    $$('[data-sheen]').forEach(el => track(el, false));
    $$('[data-hex]').forEach(el => track(el, false));
  }

  /* layout on resize */
  let rz = 0;
  addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => { globe.reflow(); sim.reflow(); }, 140);
  });
  addEventListener('orientationchange', () => setTimeout(() => { globe.reflow(); sim.reflow(); }, 250));

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      globe.redraw();
      sim.refresh(false);
      stage.paint();
    });
  }

  /* ======================================================================
     9. Boot
     ====================================================================== */
  applyLang(true);
  globe.start();
  rot.start();
  onScroll();
})();
