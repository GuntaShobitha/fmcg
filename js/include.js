/* Shared nav + footer injection, mobile menu, and auth-aware profile */

const NAV_HTML = (active) => `
<nav class="nav">
  <div class="container inner">
    <a href="/index.html" class="nav-logo" aria-label="Stackly home">
      <img src="/images/stackly-logo-green.webp" alt="STACKLY Logo" class="nav-logo-img" />
    </a>
    <ul class="nav-links" id="navLinks">
      <li><a href="/index.html" class="${active === 'home' ? 'active' : ''}">Home</a></li>
      <li><a href="/about.html" class="${active === 'about' ? 'active' : ''}">About</a></li>
      <li><a href="/services.html" class="${active === 'services' ? 'active' : ''}">Services</a></li>
      <li><a href="/blog.html" class="${active === 'blog' ? 'active' : ''}">Blog</a></li>
      <li><a href="/contact.html" class="${active === 'contact' ? 'active' : ''}">Contact</a></li>
      <li class="nav-mobile-only" id="navAuthMobile"></li>
    </ul>
    <div class="nav-cta">
      <div id="navAuthDesktop"></div>
      <button class="hamburger" aria-label="Open menu" aria-expanded="false" type="button">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-backdrop" id="navBackdrop"></div>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="container">
    <div class="foot-grid">
      <div>
        <a href="index.html">
          <img src="/images/stackly-logo-green.webp" alt="STACKLY" style="height:80px;width:120px;margin-bottom:16px"/>
        </a>
        <p style="color:#c9d1c1;max-width:320px">Farm-fresh organic FMCG delivered from local farms to your kitchen, every single day.</p>
        <div class="foot-social">
          <a href="404.html" data-social aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg></a>
          <a href="404.html" data-social aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg></a>
          <a href="404.html" data-social aria-label="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg></a>
          <a href="404.html" data-social aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
</svg></a>
        </div>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Products</h4>
        <ul>
          <li><a href="404.html">Fresh Fruits</a></li>
          <li><a href="404.html">Vegetables</a></li>
          <li><a href="404.html">Dairy</a></li>
          <li><a href="404.html">Grains</a></li>
        </ul>
      </div>
      <div>
        <h4>Support</h4>
        <ul>
          <li><a href="404.html">Help Center</a></li>
          <li><a href="404.html">Delivery</a></li>
          <li><a href="404.html">Returns</a></li>
          <li><a href="404.html">My Account</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">&copy; <span data-year></span> Stackly Organic FMCG. Crafted with care from farm to home.</div>
  </div>
</footer>`;

function getStackUser() {
  try { return JSON.parse(localStorage.getItem('stackly_user') || 'null'); }
  catch { return null; }
}

function initials(u) {
  const s = (u && (u.name || u.email)) || '?';
  return s.trim().charAt(0).toUpperCase();
}

function renderAuthArea() {
  const u = getStackUser();
  const desktop = document.getElementById('navAuthDesktop');
  const mobile = document.getElementById('navAuthMobile');
  if (!desktop || !mobile) return;

  if (!u) {
    desktop.innerHTML = `<a href="/login.html" class="btn btn-primary nav-login-btn">Login</a>`;
    mobile.innerHTML = `<a href="/login.html" class="btn btn-primary nav-mobile-login">Login</a>`;
    return;
  } else {
      desktop.innerHTML = `<a href="/login.html" class="btn btn-primary nav-login-btn">Login</a>`;
    mobile.innerHTML = `<a href="/login.html" class="btn btn-primary nav-mobile-login">Login</a>`;
  }

  // const dashHref = u.role === 'admin' ? '/admin/dashboard.html' : '/user/dashboard.html';
  // const avatar = `<span class="nav-avatar" aria-hidden="true">${initials(u)}</span>`;
  // const info = `
  //   <span class="nav-profile-info">
  //     <strong class="nav-profile-name">${escapeHtml(u.name || '')}</strong>
  //     <small class="nav-profile-email">${escapeHtml(u.email || '')}</small>
  //   </span>`;

  // desktop.innerHTML = `
  //   <a href="${dashHref}" class="nav-profile" title="${escapeHtml(u.email || '')}">
  //     ${avatar}${info}
  //   </a>`;

  // mobile.innerHTML = `
  //   <a href="${dashHref}" class="nav-profile nav-profile--mobile">
  //     ${avatar}${info}
  //   </a>
  //   <button type="button" class="btn btn-ghost nav-mobile-logout" data-logout>Log out</button>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function setupMobileMenu() {
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-links');
  const backdrop = document.getElementById('navBackdrop');
  if (!burger || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('open');
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  };
  const openMenu = () => {
    menu.classList.add('open');
    burger.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-open');
  };

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // Logout delegated
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-logout]')) {
      localStorage.removeItem('stackly_user');
      window.location.href = '/index.html';
    }
  });
}

function setupLoader() {
  const l = document.getElementById('stackly-loader');
  if (!l) return;
  const hide = () => l.classList.add('hide');
  if (document.readyState === 'complete') setTimeout(hide, 200);
  else window.addEventListener('load', () => setTimeout(hide, 200));
  setTimeout(hide, 3000);
}

function setupFormValidation() {
  document.querySelectorAll('form').forEach(form => {
    if (form.dataset.novalidate === 'true') return;
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', (e) => {
      let firstBad = null;
      form.querySelectorAll('input,select,textarea').forEach(el => {
        const field = el.closest('.field') || el.parentElement;
        if (!field) return;
        field.classList.remove('has-error');
        let msg = '';
        const val = (el.value || '').trim();
        if (el.hasAttribute('required') && !val) msg = 'This field is required';
        else if (el.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) msg = 'Enter a valid email';
        else if ((el.type === 'tel' || el.name === 'phone') && val && !/^[+\d][\d\s\-()]{6,}$/.test(val)) msg = 'Enter a valid phone';
        if (msg) {
          field.classList.add('has-error');
          let er = field.querySelector('.error');
          if (!er) { er = document.createElement('small'); er.className = 'error'; field.appendChild(er); }
          er.textContent = msg;
          if (!firstBad) firstBad = el;
        }
      });
      if (firstBad) {
        e.preventDefault();
        e.stopImmediatePropagation();
        firstBad.focus();
      }
    }, true);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const active = document.body.dataset.page || '';
  const navSlot = document.getElementById('nav-slot');
  const footSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.outerHTML = NAV_HTML(active);
  // Always inject footer (create slot if missing on non-dashboard pages)
  if (!footSlot && !document.querySelector('footer') && !document.body.classList.contains('dash')) {
    const slot = document.createElement('div');
    slot.id = 'footer-slot';
    document.body.appendChild(slot);
  }
  const fs = document.getElementById('footer-slot');
  if (fs) fs.outerHTML = FOOTER_HTML;

  renderAuthArea();
  setupMobileMenu();
  setupLoader();
  setupFormValidation();

  // Auto-convert tel/mail text nodes
  document.querySelectorAll('[data-tel]').forEach(el => {
    const n = el.textContent.trim();
    el.innerHTML = `<a href="tel:${n.replace(/[^+\d]/g, '')}">${n}</a>`;
  });
  document.querySelectorAll('[data-mail]').forEach(el => {
    const n = el.textContent.trim();
    el.innerHTML = `<a href="mailto:${n}">${n}</a>`;
  });

  const s = document.createElement('script');
  s.src = '/js/main.js';
  document.body.appendChild(s);
});
