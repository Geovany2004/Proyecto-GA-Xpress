import { supabase } from './supabase-client.js';

const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  const { error, user, session } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(`❌ Error: ${error.message}`);
  } else {
    alert('✅ Inicio de sesión correcto');
    window.location.href = 'dashboard.html';
  }
});
