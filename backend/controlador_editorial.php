<?php
require_once 'conexion.php';

class ControladorEditorial
{

    /* MÉTODO PARA IMPRIMIR LAS EDITORIALES EN EL ADMIN PANEL */
    public static function obtenerEditoriales()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Editorial";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function agregarEditorial($datos)
    {
        $conexion = Conexion::conectar();
        $sql = "INSERT INTO Editorial (nombre, telefono, direccion, fecha_nacimiento) 
                VALUES (:nombre, :telefono, :direccion, :fecha_nacimiento)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':nombre', $datos['nombre']);
        $stmt->bindParam(':telefono', $datos['telefono']);
        $stmt->bindParam(':direccion', $datos['direccion']);
        $stmt->bindParam(':fecha_nacimiento', $datos['fecha_nacimiento']);
        return $stmt->execute();
    }

    public static function editarEditorial($datos)
    {
        $conexion = Conexion::conectar();
        $sql = "UPDATE Editorial SET nombre = :nombre, telefono = :telefono, 
                direccion = :direccion, fecha_nacimiento = :fecha_nacimiento 
                WHERE id = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':nombre', $datos['nombre']);
        $stmt->bindParam(':telefono', $datos['telefono']);
        $stmt->bindParam(':direccion', $datos['direccion']);
        $stmt->bindParam(':fecha_nacimiento', $datos['fecha_nacimiento']);
        $stmt->bindParam(':id', $datos['id']);
        return $stmt->execute();
    }

    public static function eliminarEditorial($id)
    {
        $conexion = Conexion::conectar();
        $sql = "DELETE FROM Editorial WHERE id = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
