// Simple demo auth (client-only)
function _saveUser(u){
  localStorage.setItem('stackly_user', JSON.stringify(u));
}

function handleLogin(e){
  e.preventDefault();
  const role = document.getElementById('role').value;
  const email = document.getElementById('email').value.trim();
  if(!role || !email){ alert('Please fill all fields'); return false;}
  const nameField = document.getElementById('name');
  const name = (nameField && nameField.value.trim()) || email.split('@')[0];
  _saveUser({role, email, name});
  window.location.href = role === 'admin' ? 'admin/dashboard.html' : 'user/dashboard.html';
  return false;
}

function handleRegister(e){
  e.preventDefault();
  const role = document.getElementById('role').value;
  const email = document.getElementById('email').value.trim();
  const name = document.getElementById('name').value.trim();
  if(!role || !email || !name){ alert('Please fill all fields'); return false;}
  _saveUser({role, email, name});
  window.location.href = role === 'admin' ? '404.html' : '404.html';
  return false;
}

function requireAuth(expectedRole){
  const u = JSON.parse(localStorage.getItem('stackly_user') || 'null');
  if(!u){ window.location.href='login.html'; return null; }
  if(expectedRole && u.role !== expectedRole){ window.location.href='login.html'; return null; }
  return u;
}

function logout(){ localStorage.removeItem('stackly_user'); window.location.href='../login.html'; }

// Sidebar toggle
document.addEventListener('click', (e) => {
  if(e.target.closest('.mobile-toggle')){
    const sb = document.querySelector('.sidebar');
    if (sb) sb.classList.toggle('open');
  }
});
