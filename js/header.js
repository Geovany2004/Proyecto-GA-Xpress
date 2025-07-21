import { supabase } from './supabase-client.js'

document.addEventListener('DOMContentLoaded', async () => {
  const { data } = await supabase.auth.getUser()
  const user = data.user

  const loginLink = document.querySelector('#login-link')
  const dashboardLink = document.querySelector('#dashboard-link')

  if (user) {
    // Usuario logueado
    if (loginLink) {
      loginLink.textContent = 'Cerrar sesión'
      loginLink.href = '#'
      loginLink.addEventListener('click', async () => {
        await supabase.auth.signOut()
        window.location.href = 'index.html'
      })
    }

    if (dashboardLink) dashboardLink.style.display = 'inline-block'
  } else {
    // No logueado
    if (dashboardLink) dashboardLink.style.display = 'none'
  }
})
