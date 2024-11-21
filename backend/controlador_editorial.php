<?php
require_once 'conexion.php';

class ControladorEditorial {
    
    /* MÉTODO PARA IMPRIMIR LAS EDITORIALES EN EL ADMIN PANEL */
    public static function obtenerEditoriales()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Editorial";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}