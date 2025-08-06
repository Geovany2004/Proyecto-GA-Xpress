import { supabase } from './supabase-client.js';

window.consultarEnvio = async () => {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");

  const { data, error } = await supabase
    .from("cotizaciones")
    .select("*")
    .eq("codigo_rastreo", codigo)
    .single();

  document.getElementById("paso1").classList.remove("activo");
  document.getElementById("paso2").classList.remove("activo");
  document.getElementById("paso3").classList.remove("activo");

  if (error || !data) {
    resultado.style.display = "block";
    document.getElementById("res-codigo").textContent = codigo;
    document.getElementById("res-estado").textContent = "No encontrado";
    document.getElementById("res-ubicacion").textContent = "-";
    document.getElementById("res-fecha").textContent = "-";
  } else {
    document.getElementById("res-codigo").textContent = codigo;
    document.getElementById("res-estado").textContent = data.estado;
    document.getElementById("res-ubicacion").textContent = data.origen + " → " + data.destino;
    document.getElementById("res-fecha").textContent = data.fecha_envio;

    if (data.estado === "En proceso") document.getElementById("paso1").classList.add("activo");
    if (data.estado === "En camino") {
      document.getElementById("paso1").classList.add("activo");
      document.getElementById("paso2").classList.add("activo");
    }
    if (data.estado === "Entregado") {
      document.getElementById("paso1").classList.add("activo");
      document.getElementById("paso2").classList.add("activo");
      document.getElementById("paso3").classList.add("activo");
    }

    resultado.style.display = "block";
  }
};