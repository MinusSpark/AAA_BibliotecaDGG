<?php
require_once 'conexion.php';

class ControladorAutor {
    public static function registrarAutor($data) {
        $conexion = Conexion::conectar();
        $sql = "INSERT INTO Autor (dni, nombre, apellido, fecha_nacimiento) VALUES (:dni, :nombre, :apellido, :fecha_nacimiento)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":dni", $data['dni']);
        $stmt->bindParam(":nombre", $data['nombre']);
        $stmt->bindParam(":apellido", $data['apellido']);
        $stmt->bindParam(":fecha_nacimiento", $data['fecha_nacimiento']);
        return $stmt->execute() ? ['status' => 'success'] : ['status' => 'error', 'message' => 'Error al registrar autor'];
    }

    public static function actualizarAutor($data) {
        $conexion = Conexion::conectar();
        $sql = "UPDATE Autor SET nombre = :nombre, apellido = :apellido, fecha_nacimiento = :fecha_nacimiento WHERE dni = :dni";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":dni", $data['dni']);
        $stmt->bindParam(":nombre", $data['nombre']);
        $stmt->bindParam(":apellido", $data['apellido']);
        $stmt->bindParam(":fecha_nacimiento", $data['fecha_nacimiento']);
        return $stmt->execute() ? ['status' => 'success'] : ['status' => 'error', 'message' => 'Error al actualizar autor'];
    }

    public static function eliminarAutor($dni) {
        $conexion = Conexion::conectar();
        $sql = "DELETE FROM Autor WHERE dni = :dni";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":dni", $dni);
        return $stmt->execute() ? ['status' => 'success'] : ['status' => 'error', 'message' => 'Error al eliminar autor'];
    }
}