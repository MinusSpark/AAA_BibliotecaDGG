<?php
require_once("conexion.php");

class Libro {
    public static function todos() {
        $conexion = Conexion::conectar();
        $query = $conexion->prepare("SELECT l.*, a.nombre AS autor, e.nombre AS editorial 
                                     FROM Libro l 
                                     JOIN Autor a ON l.autor_dni = a.dni
                                     JOIN Editorial e ON l.editorial_id = e.id");
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
