<?php
$conexion = new mysqli("localhost", "root", "", "xpress_logistics");

if ($conexion->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión: " . $conexion->connect_error]));
}

$codigo = "XP" . rand(100000, 999999) . "CR";

// Validar que POST esté lleno
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = $_POST['nombre'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $tipoCarga = $_POST['tipoCarga'] ?? '';
    $peso = $_POST['peso'] ?? 0;
    $origen = $_POST['origen'] ?? '';
    $destino = $_POST['destino'] ?? '';
    $fecha = $_POST['fecha'] ?? '';
    $comentarios = $_POST['comentarios'] ?? '';

    $sql = "INSERT INTO cotizaciones 
        (nombre, correo, telefono, tipo_carga, peso, origen, destino, fecha_envio, comentarios, codigo_rastreo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ssssdsssss", 
        $nombre, $correo, $telefono, $tipoCarga, $peso, $origen, $destino, $fecha, $comentarios, $codigo);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "codigo" => $codigo]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => "Método no permitido"]);
}

$conexion->close();
?>
