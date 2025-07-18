<?php
$conexion = new mysqli("localhost", "root", "", "xpress_logistics");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$codigo = $_GET["codigo"] ?? "";

$sql = "SELECT * FROM cotizaciones WHERE codigo_rastreo = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $codigo);
$stmt->execute();
$resultado = $stmt->get_result();
$cotizacion = $resultado->fetch_assoc();
$stmt->close();
$conexion->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Resultado de Seguimiento</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header>
    <h1>XPRESS GA LOGISTICS</h1>
  </header>

  <main>
    <section>
      <h2>Resultado de Seguimiento</h2>

      <?php if ($cotizacion): ?>
        <p><strong>Nombre:</strong> <?= htmlspecialchars($cotizacion['nombre']) ?></p>
        <p><strong>Correo:</strong> <?= htmlspecialchars($cotizacion['correo']) ?></p>
        <p><strong>Teléfono:</strong> <?= htmlspecialchars($cotizacion['telefono']) ?></p>
        <p><strong>Origen:</strong> <?= htmlspecialchars($cotizacion['origen']) ?></p>
        <p><strong>Destino:</strong> <?= htmlspecialchars($cotizacion['destino']) ?></p>
        <p><strong>Fecha de envío:</strong> <?= htmlspecialchars($cotizacion['fecha']) ?></p>
        <p><strong>Tipo de carga:</strong> <?= htmlspecialchars($cotizacion['tipoCarga']) ?></p>
        <p><strong>Estado actual:</strong> <span style="color:green; font-weight:bold;"><?= htmlspecialchars($cotizacion['estado']) ?></span></p>
      <?php else: ?>
        <p style="color: red;">❌ No se encontró ningún envío con ese código.</p>
      <?php endif; ?>

      <br>
      <a href="seguimiento.html">← Volver a la página de seguimiento</a>
    </section>
  </main>

  <footer>
    <p>© 2025 XPRESS GA LOGISTICS · Desarrollado por Geovany y Alexander</p>
  </footer>
</body>
</html>
