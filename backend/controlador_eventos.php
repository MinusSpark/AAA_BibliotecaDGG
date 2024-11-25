<?php
require_once 'conexion.php';

class ControladorEventos {
    public static function obtenerEventos() {
        $conexion = Conexion::conectar();
        if ($conexion) {
            $query = "SELECT * FROM eventos";
            $stmt = $conexion->query($query);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return null;
        }
    }

    public static function añadirEvento($fecha, $descripcion) {
        $conexion = Conexion::conectar();
        if ($conexion) {
            $query = "INSERT INTO eventos (fecha, descripcion) VALUES (:fecha, :descripcion)";
            $stmt = $conexion->prepare($query);
            return $stmt->execute([':fecha' => $fecha, ':descripcion' => $descripcion]);
        } else {
            return false;
        }
    }

    public static function borrarEvento($id) {
        $conexion = Conexion::conectar();
        if ($conexion) {
            $query = "DELETE FROM eventos WHERE id = :id";
            $stmt = $conexion->prepare($query);
            return $stmt->execute([':id' => $id]);
        } else {
            return false;
        }
    }
}
?>
