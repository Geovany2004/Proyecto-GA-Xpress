<?php
$conexion = new mysqli("localhost", "root", "", "xpress_logistics");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $codigo = $_POST["codigo"];
    $estado = $_POST["estado"];

    $sql = "UPDATE cotizaciones SET estado = ? WHERE codigo_rastreo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $estado, $codigo);

    if ($stmt->execute()) {
        $mensaje = "✅ Estado actualizado correctamente.";
    } else {
        $mensaje = "❌ Error al actualizar el estado.";
    }

    $stmt->close();
}

// Para mostrar los datos de una cotización
$datosCotizacion = null;
if (!empty($_GET["codigo"])) {
    $codigo = $_GET["codigo"];
    $stmt = $conexion->prepare("SELECT * FROM cotizaciones WHERE codigo_rastreo = ?");
    $stmt->bind_param("s", $codigo);
    $stmt->execute();
    $result = $stmt->get_result();
    $datosCotizacion = $result->fetch_assoc();
    $stmt->close();
}

$conexion->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Administración - Estado</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        input, select, button { margin: 5px 0; padding: 10px; width: 100%; max-width: 400px; }
        .resultado { margin-top: 20px; font-weight: bold; }
    </style>
</head>
<body>

    <h1>Actualizar Estado de Envío</h1>

    <form method="get">
        <input type="text" name="codigo" placeholder="Código de rastreo" required>
        <button type="submit">Buscar</button>
    </form>

    <?php if ($datosCotizacion): ?>
        <hr>
        <p><strong>Nombre:</strong> <?= htmlspecialchars($datosCotizacion["nombre"]) ?></p>
        <p><strong>Estado actual:</strong> <?= htmlspecialchars($datosCotizacion["estado"]) ?></p>

        <form method="post">
            <input type="hidden" name="codigo" value="<?= htmlspecialchars($datosCotizacion["codigo_rastreo"]) ?>">
            <label for="estado">Nuevo estado:</label>
            <select name="estado" required>
                <option value="En proceso">En proceso</option>
                <option value="En tránsito">En tránsito</option>
                <option value="Entregado">Entregado</option>
                <option value="Cancelado">Cancelado</option>
            </select>
            <button type="submit">Actualizar Estado</button>
        </form>
    <?php endif; ?>

    <?php if ($mensaje): ?>
        <div class="resultado"><?= $mensaje ?></div>
    <?php endif; ?>

</body>
</html>
