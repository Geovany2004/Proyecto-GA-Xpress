import { supabase } from './supabase-client.js';

const form = document.querySelector('#cotizacionForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert('Debes iniciar sesión para cotizar.');
    window.location.href = 'login.html';
    return;
  }

  const payload = {
    nombre: form.nombre.value,
    correo: form.correo.value,
    telefono: form.telefono.value,
    tipo_carga: form.tipoCarga.value,
    peso: parseFloat(form.peso.value),
    origen: form.origen.value,
    destino: form.destino.value,
    fecha_envio: form.fecha.value,
    comentarios: form.comentarios.value,
    codigo_rastreo: 'XP' + Math.floor(Math.random() * 1000000) + 'CR',
    user_id: user.id,
    estado: 'En proceso'
  };

  const { error } = await supabase
    .from('cotizaciones')
    .insert(payload);

  if (error) {
    alert(`❌ Error al guardar cotización: ${error.message}`);
  } else {
    alert(`✅ Cotización registrada. Tu código de rastreo es: ${payload.codigo_rastreo}`);
    form.reset();
  }
});
