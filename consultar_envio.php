<?php
// Configuración de conexión
$host = "localhost";
$user = "root";
$pass = "";
$db = "xpress_logistics";

// Crear conexión
$conexion = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexión a la base de datos"]));
}

// Obtener código de la URL
$codigo = $_GET['codigo'] ?? '';

if (!$codigo) {
    echo json_encode(["error" => "Código vacío"]);
    exit;
}

// Consulta SQL
$sql = "SELECT estado, ubicacion, fecha_registro FROM cotizaciones WHERE codigo_rastreo = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $codigo);
$stmt->execute();
$resultado = $stmt->get_result();

// Resultado
if ($resultado->num_rows > 0) {
    $datos = $resultado->fetch_assoc();
    echo json_encode($datos);
} else {
    echo json_encode(["error" => "No encontrado"]);
}

// Cierre
$stmt->close();
$conexion->close();
?>
