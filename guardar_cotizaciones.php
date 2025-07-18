<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Validar que sea método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo "Método no permitido";
    exit;
}

// Conectar a la base de datos
$conexion = new mysqli("localhost", "root", "", "xpress_logistics");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener y limpiar datos del formulario
$nombre      = $_POST['nombre'] ?? '';
$correo      = $_POST['correo'] ?? '';
$telefono    = $_POST['telefono'] ?? '';
$tipoCarga   = $_POST['tipoCarga'] ?? '';
$peso        = $_POST['peso'] ?? 0;
$origen      = $_POST['origen'] ?? '';
$destino     = $_POST['destino'] ?? '';
$fecha       = $_POST['fecha'] ?? '';
$comentarios = $_POST['comentarios'] ?? '';
$codigo      = "XP" . rand(100000, 999999) . "CR";

// Preparar y ejecutar la consulta
$sql = "INSERT INTO cotizaciones 
(nombre, correo, telefono, tipo_carga, peso, origen, destino, fecha_envio, comentarios, codigo_rastreo)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);

if (!$stmt) {
    die("Error al preparar la consulta: " . $conexion->error);
}

$stmt->bind_param("ssssdsssss",
    $nombre, $correo, $telefono,
    $tipoCarga, $peso, $origen,
    $destino, $fecha, $comentarios, $codigo
);

if ($stmt->execute()) {
    echo "✅ Cotización registrada correctamente. Tu código de rastreo es: <strong>$codigo</strong>";
} else {
    echo "❌ Error al guardar la cotización: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>
