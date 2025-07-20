import { supabase } from './supabase-client.js';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value,
      correo: form.correo.value,
      telefono: form.telefono.value,
      tipo_carga: form.tipoCarga.value,
      peso: parseFloat(form.peso.value),
      origen: form.origen.value,
      destino: form.destino.value,
      fecha_envio: form.fecha.value,
      comentarios: form.comentarios.value,
      codigo_rastreo: `XP${Math.floor(Math.random()*900000)+100000}CR`,
      estado: "Procesando"
    };

    const { error } = await supabase.from("cotizaciones").insert(data);

    const resultado = document.getElementById("resultado");
    if (error) {
      resultado.textContent = `❌ Error: ${error.message}`;
      resultado.style.color = "red";
    } else {
      resultado.textContent = `✅ Cotización registrada correctamente. Código: ${data.codigo_rastreo}`;
      resultado.style.color = "green";
      form.reset();
    }
  });
});