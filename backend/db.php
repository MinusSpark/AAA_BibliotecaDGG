<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "biblioteca";

//crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

//veerificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
