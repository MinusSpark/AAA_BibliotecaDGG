<?php
session_start();
require_once '../Modelo/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $isbn = $_POST['isbn'];
    $dni_usuario = $_SESSION['dni'];

    $query = "INSERT INTO Libros_Prestados (isbn, dni_usuario, fecha_prestamo) VALUES (?, ?, NOW())";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $isbn, $dni_usuario);

    if ($stmt->execute()) {
        echo "Préstamo realizado correctamente.";
    } else {
        echo "Error al realizar el préstamo.";
    }
}
?>
