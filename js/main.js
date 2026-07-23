// Radial orbital product picks
(function () {
  const stage = document.getElementById('orbitStage');
  if (!stage) return;

  const nodes = Array.from(stage.querySelectorAll('.orbit-node'));
  const total = nodes.length;
  let angle = 0;
  let autoRotate = true;

  function radiusForWidth() {
    // const w = window.innerWidth;
    // if (w <= 600) return 115;
    // if (w <= 900) return 160;
    // return 228;

    const w = window.innerWidth;

  if (w <= 360) return 75;
  if (w <= 480) return 90;
  if (w <= 600) return 100;
  if (w <= 900) return 160;

  return 228;
  }

  function render() {
    const radius = radiusForWidth();
    nodes.forEach((node, i) => {
      const nodeAngle = ((i / total) * 360 + angle) % 360;
      const rad = (nodeAngle * Math.PI) / 180;
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);
      const opacity = Math.max(0.55, Math.min(1, 0.55 + 0.45 * ((1 + Math.sin(rad)) / 2)));
      node.style.transform = `translate(${x}px, ${y}px)`;
      if (node.classList.contains('active')) {
        node.style.zIndex = 300;
        node.style.opacity = 1;
      } else {
        node.style.zIndex = Math.round(100 + 50 * Math.cos(rad));
        node.style.opacity = String(opacity);
      }
    });
  }

  setInterval(() => {
    if (!autoRotate) return;
    angle = (angle + 0.3) % 360;
    render();
  }, 50);

  window.addEventListener('resize', render);
  render();

  nodes.forEach((node) => {
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasActive = node.classList.contains('active');
      nodes.forEach((n) => n.classList.remove('active'));
      if (!wasActive) {
        node.classList.add('active');
        autoRotate = false;
      } else {
        autoRotate = true;
      }
      render();
    });
  });

  stage.addEventListener('click', () => {
    nodes.forEach((n) => n.classList.remove('active'));
    autoRotate = true;
    render();
  });
})();

// Nav scroll effect
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// Mobile menu is handled in include.js

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Counters
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const t = setInterval(() => {
      n += step;
      if (n >= target) { n = target; clearInterval(t); }
      el.textContent = n.toLocaleString() + (el.dataset.suffix || '');
    }, 24);
    counterIO.unobserve(el);
  });
}, { threshold: 0.4 });
document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

// Newsletter demo
document.querySelectorAll('form.demo-form').forEach(f => {
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = f.querySelector('button');
    const old = btn.textContent;
    btn.textContent = '✓ Subscribed';
    window.location.href = './404.html'
    
    btn.disabled = true;
    setTimeout(() => { btn.textContent = old; btn.disabled = false; f.reset(); }, 2500);
  });
});

// Social redirect to 404
document.querySelectorAll('[data-social]').forEach(a => {
  a.addEventListener('click', (e) => { e.preventDefault(); window.location.href = '/404.html'; });
});

// Year
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Hero image crossfade switcher (liquid-glass pill controls)
const heroSwitchBtns = document.querySelectorAll('.hero-switch-btn');
const heroBgImgs = document.querySelectorAll('.hero-bg-img');
let heroTransitioning = false;

function activateHero(btn) {
  if (!btn || heroTransitioning || btn.classList.contains('active')) return;
  heroTransitioning = true;
  const target = btn.dataset.target;
  heroSwitchBtns.forEach(b => b.classList.toggle('active', b === btn));
  heroBgImgs.forEach(img => img.classList.toggle('active', img.dataset.bg === target));
  setTimeout(() => { heroTransitioning = false; }, 1000); // matches 1000ms CSS crossfade
}

heroSwitchBtns.forEach(btn => btn.addEventListener('click', () => activateHero(btn)));

// Gentle autoplay through the hero looks, pauses if the user is interacting
if (heroSwitchBtns.length) {
  let heroAutoIndex = 0;
  let heroAutoTimer = setInterval(() => {
    heroAutoIndex = (heroAutoIndex + 1) % heroSwitchBtns.length;
    activateHero(heroSwitchBtns[heroAutoIndex]);
  }, 6000);

  heroSwitchBtns.forEach((btn, i) => btn.addEventListener('click', () => {
    heroAutoIndex = i;
    clearInterval(heroAutoTimer);
    heroAutoTimer = setInterval(() => {
      heroAutoIndex = (heroAutoIndex + 1) % heroSwitchBtns.length;
      activateHero(heroSwitchBtns[heroAutoIndex]);
    }, 6000);
  }));
}

// Scroll-zoom hero (works on desktop scroll and mobile touch-scroll)
const heroZoomWrap = document.querySelector('.hero-bg');
const heroSection = document.querySelector('.hero');
if (heroZoomWrap && heroSection) {
  const MAX_SCALE = 1.22;   // how much it zooms in
  const MAX_FADE = 0.35;    // how much it fades out while zooming
  let ticking = false;

  const updateHeroZoom = () => {
    const rect = heroSection.getBoundingClientRect();
    // progress: 0 at top of page, 1 once you've scrolled a full hero-height past it
    const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
    const scale = 1 + progress * (MAX_SCALE - 1);
    const opacity = 1 - progress * MAX_FADE;
    heroZoomWrap.style.transform = `scale(${scale})`;
    heroZoomWrap.style.opacity = String(opacity);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeroZoom);
      ticking = true;
    }
  }, { passive: true });

  updateHeroZoom();
}