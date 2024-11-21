<?php
require_once 'conexion.php';

class ControladorAutor {
    

    
    /* MÉTODO PARA IMPRIMIR AUTORES EN EL ADMIN PANEL */
    public static function obtenerAutores()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Autor";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}