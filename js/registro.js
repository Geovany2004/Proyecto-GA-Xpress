import { supabase } from './supabase-client.js';

const form = document.getElementById('registro-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(`❌ Error: ${error.message}`);
  } else {
    alert('✅ Registro exitoso. Revisa tu correo para confirmar.');
    window.location.href = 'login.html';
  }
});
