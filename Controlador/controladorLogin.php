<?php
require_once("../Modelo/Usuario.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    // Verificamos el login
    $usuario = Usuario::verificarLogin($correo, $contraseña);

    if ($usuario) {
        // Redirigir al panel principal o la página de libros
        header("Location: ../Vista/index.php");
        exit();
    } else {
        echo "Error: Credenciales inválidas";
    
    }
}
?>
