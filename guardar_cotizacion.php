<?php
$conexion = new mysqli("localhost", "root", "", "xpress_logistics");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Generar código único
$codigo = "XP" . rand(100000, 999999) . "CR";

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$tipo_carga = $_POST['tipoCarga'];
$peso = $_POST['peso'];
$origen = $_POST['origen'];
$destino = $_POST['destino'];
$fecha = $_POST['fecha'];
$comentarios = $_POST['comentarios'];

// Insertar en la base de datos
$sql = "INSERT INTO cotizaciones (nombre, correo, telefono, tipo_carga, peso, origen, destino, fecha_envio, comentarios, codigo_rastreo)
        VALUES ('$nombre', '$correo', '$telefono', '$tipo_carga', $peso, '$origen', '$destino', '$fecha', '$comentarios', '$codigo')";

if ($conexion->query($sql) === TRUE) {
    echo json_encode(["success" => true, "codigo" => $codigo]);
} else {
    echo json_encode(["success" => false, "error" => $conexion->error]);
}

$conexion->close();
?>
