import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Datos de tu proyecto
const supabaseUrl = 'https://TU-PROYECTO.supabase.co'
const supabaseKey = 'TU-KEY-ANON'
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert('Debes iniciar sesión primero')
    window.location.href = 'login.html'
    return
  }

  cargarCotizaciones(user.id)

  const logoutBtn = document.getElementById('logout-btn')
  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut()
    window.location.href = 'login.html'
  })
})

async function cargarCotizaciones(userId) {
  const { data, error } = await supabase
    .from('cotizaciones')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error(error)
    alert('Error al cargar cotizaciones')
    return
  }

  const tbody = document.querySelector('#tabla-cotizaciones tbody')
  tbody.innerHTML = ''

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">No tienes cotizaciones registradas aún.</td></tr>'
    return
  }

  data.forEach(c => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${c.codigo_rastreo}</td>
      <td>${c.origen}</td>
      <td>${c.destino}</td>
      <td>${c.fecha_envio}</td>
      <td>${c.estado}</td>
    `
    tbody.appendChild(tr)
  })
}
