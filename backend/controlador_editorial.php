<?php
require_once 'conexion.php';

class ControladorEditorial {
    public static function registrarEditorial($data) {
        $conexion = Conexion::conectar();
        $sql = "INSERT INTO Editorial (nombre, telefono, direccion, fecha_nacimiento) VALUES (:nombre, :telefono, :direccion, :fecha_nacimiento)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":nombre", $data['nombre']);
        $stmt->bindParam(":telefono", $data['telefono']);
        $stmt->bindParam(":direccion", $data['direccion']);
        $stmt->bindParam(":fecha_nacimiento", $data['fecha_nacimiento']);
        return $stmt->execute() ? ['status' => 'success'] : ['status' => 'error', 'message' => 'Error al registrar editorial'];
    }

    public static function actualizarEditorial($data) {
        $conexion = Conexion::conectar();
        $sql = "UPDATE Editorial SET nombre = :nombre, telefono = :telefono, direccion = :direccion, fecha_nacimiento = :fecha_nacimiento WHERE id = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":id", $data['id']);
        $stmt->bindParam(":nombre", $data['nombre']);
        $stmt->bindParam(":telefono", $data['telefono']);
        $stmt->bindParam(":direccion", $data['direccion']);
        $stmt->bindParam(":fecha_nacimiento", $data['fecha_nacimiento']);
        return $stmt->execute() ? ['status' => 'success'] : ['status' => 'error', 'message' => 'Error al actualizar editorial'];
    }

    public static function eliminarEditorial($id) {
        $conexion = Conexion::conectar();
        $sql = "DELETE FROM Editorial WHERE id = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":id", $id);
        return $stmt->execute() ? ['status' => 'success'] : ['status' => 'error', 'message' => 'Error al eliminar editorial'];
    }
}