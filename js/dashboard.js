// Shared dashboard sidebar rendering
const SIDE_ITEMS = {
  user: [
    ['dashboard','🏠','Dashboard','user/dashboard.html'],
    ['orders','📦','My Orders','user/orders.html'],
    ['products','🥦','Browse Products','user/products.html'],
    ['subscription','🔁','Subscription','user/subscription.html'],
    ['wishlist','❤️','Wishlist','user/wishlist.html'],
   
  ],
  admin: [
    ['dashboard','📊','Dashboard','../admin/dashboard.html'],
    ['orders','📦','Orders','../admin/orders.html'],
    ['products','🥦','Products','../admin/products.html'],
    ['customers','👥','Customers','../admin/customers.html'],
    ['farmers','👩‍🌾','Farmers','../admin/farmers.html'],
    ['analytics','📈','Analytics','../admin/analytics.html'],
  ],
};

function renderDashShell(role, active, title){
  const u = requireAuth(role);
  if(!u) return;
  const items = SIDE_ITEMS[role];
  const initials = (u.name||u.email).slice(0,1).toUpperCase();
  const side = `
    <aside class="sidebar">
      <div class="brand"><img src="./images/stackly-logo-green.webp" alt="STACKLY"/></div>
      <div class="side-profile">
        <div class="side-avatar">${initials}</div>
        <div class="side-profile-info">
          <strong>${u.name || ''}</strong>
          <small>${u.email || ''}</small>
        </div>
      </div>
      <ul class="side-nav">
        ${items.map(i=>`<li><a href="${i[3]}" class="${i[0]===active?'active':''}"><span class="ico">${i[1]}</span>${i[2]}</a></li>`).join('')}
      </ul>
      <div class="side-bottom">
        <a href="/${role}/settings.html" class="${active==='settings'?'active':''}" style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:10px;color:#c9d1c1"><span class="ico">⚙️</span>Settings</a>
        <a onclick="logout()" style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:10px;color:#c9d1c1;cursor:pointer"><span class="ico">↩</span>Logout</a>
      </div>
    </aside>`;
  const bar = `
    <div class="top-bar">
      <div style="display:flex;align-items:center;gap:14px;min-width:0">
        <button class="mobile-toggle" aria-label="Menu">☰</button>
        <h1>${title}</h1>
      </div>
      <div class="top-user">
        <div class="top-user-info">
          <strong>${u.name || ''}</strong>
          <small>${u.email || ''}</small>
        </div>
        <div class="avatar">${initials}</div>
      </div>
    </div>`;
  document.getElementById('dash-side').outerHTML = side;
  document.getElementById('dash-topbar').outerHTML = bar;
}
