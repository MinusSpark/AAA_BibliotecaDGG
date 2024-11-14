<?php

require_once 'conexion.php';

class ControladorAdmin
{
    public static function obtenerAdministradores() {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Administrador"; 
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
}

?>