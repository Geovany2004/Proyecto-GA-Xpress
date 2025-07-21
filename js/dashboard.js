import { supabase } from './supabase-client.js'

document.addEventListener('DOMContentLoaded', async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    alert('Debes iniciar sesión primero')
    window.location.href = 'login.html'
    return
  }

    // Mostrar mensaje de bienvenida
  const usuarioNombre = document.getElementById('usuario-nombre');
  usuarioNombre.textContent = user.email;
  cargarCotizaciones(user.id)

  const logoutBtn = document.getElementById('logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await supabase.auth.signOut()
      window.location.href = 'login.html'
    })
  }
})

async function cargarCotizaciones(userId) {
  const { data, error } = await supabase
    .from('cotizaciones')
    .select('*')
    .eq('user_id', userId)

  const tbody = document.querySelector('#tabla-cotizaciones tbody');
  tbody.innerHTML = '';

  if (error) {
    console.error(error)
    alert('Error al cargar cotizaciones')
    return
  }

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">No tienes cotizaciones registradas aún.</td></tr>'
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
      <td>
        ${c.estado !== 'Cancelado'
          ? `<button onclick="cancelarCotizacion('${c.id}')">Cancelar</button>`
          : '—'}
      </td>
    `
    tbody.appendChild(tr)
  })
}

window.cancelarCotizacion = async (id) => {
  if (!confirm('¿Seguro que deseas cancelar esta cotización?')) return

  const { error } = await supabase
    .from('cotizaciones')
    .update({ estado: 'Cancelado' })
    .eq('id', id)

  if (error) {
    alert('Error al cancelar')
  } else {
    alert('Cotización cancelada')
    location.reload()
  }
}
