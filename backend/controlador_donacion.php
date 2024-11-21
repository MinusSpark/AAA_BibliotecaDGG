<?php
require_once 'conexion.php';

class ControladorDonacion
{

    /* Método para crear una donación*/
    public static function crearDonacion($nombre, $monto, $mensaje)
    {
        try {
            $conexion = Conexion::conectar();
            if ($conexion) {
                $sql = "INSERT INTO donaciones (nombre, monto, mensaje) VALUES (:nombre, :monto, :mensaje)";
                $stmt = $conexion->prepare($sql);
                $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
                $stmt->bindParam(':monto', $monto, PDO::PARAM_STR);
                $stmt->bindParam(':mensaje', $mensaje, PDO::PARAM_STR);
                $stmt->execute();
                return ['status' => 'success', 'message' => 'Donación registrada correctamente.'];
            } else {
                return ['status' => 'error', 'message' => 'Error al conectar con la base de datos.'];
            }
        } catch (PDOException $e) {
            return ['status' => 'error', 'message' => 'Error al registrar la donación: ' . $e->getMessage()];
        }
    }

    /* Método para obtener todas las donaciones */
    public static function obtenerDonaciones()
    {
        try {
            $conexion = Conexion::conectar();
            if ($conexion) {
                $sql = "SELECT FROM donaciones";
                $stmt = $conexion->query($sql);
                $donaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $donaciones;
            } else {
                return null;
            }
        } catch (PDOException $e) {
            return null;
        }
    }
}
