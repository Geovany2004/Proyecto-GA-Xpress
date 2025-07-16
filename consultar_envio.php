<?php
$conexion = new mysqli("localhost", "root", "", "xpress_logistics");

$codigo = $_GET['codigo'] ?? '';

$sql = "SELECT * FROM cotizaciones WHERE codigo_rastreo = '$codigo'";
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    echo json_encode($resultado->fetch_assoc());
} else {
    echo json_encode(["error" => "No encontrado"]);
}

$conexion->close();
?>
