<?php
session_start();
require_once '../Modelo/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dni = $_POST['dni'];
    $password = $_POST['password'];

    $query = "SELECT * FROM Usuario WHERE dni = ? AND contraseña = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss",$dni, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $_SESSION['dni'] = $dni;
        header("Location: ../Vista/index.php");
    } else {
        echo "Credenciales incorrectas";
        
    }
}
?> 
