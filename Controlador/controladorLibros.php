<?php
require_once("../Modelo/Libro.php");

function obtenerLibros() {
    return Libro::todos();
}
?>
