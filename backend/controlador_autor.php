<?php
require_once 'conexion.php';

class ControladorAutor
{
    /* MÉTODO PARA IMPRIMIR AUTORES EN EL ADMIN PANEL */
    public static function obtenerAutores()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Autor";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /* MÉTODO PARA AGREGAR AUTORES A LA BASE DE DATOS DESDE EL ADMINPANEL */
    public static function agregarAutor($datos)
    {
        try {
            $conexion = Conexion::conectar();
            $sql = "INSERT INTO Autor (dni, nombre, apellido, fecha_nacimiento) VALUES (:dni, :nombre, :apellido, :fecha_nacimiento)";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':dni', $datos['dni']);
            $stmt->bindParam(':nombre', $datos['nombre']);
            $stmt->bindParam(':apellido', $datos['apellido']);
            $stmt->bindParam(':fecha_nacimiento', $datos['fecha_nacimiento']);
            return $stmt->execute();
        } catch (Exception $e) {
            error_log("Error al agregar autor: " . $e->getMessage());
            return false;
        }
    }

    /* MÉTODO PARA EDITAR AUTORES EN LA BASE DE DATOS DESDE EL ADMINPANEL */
    public static function editarAutor($datos)
    {
        try {
            $conexion = Conexion::conectar();
            $sql = "UPDATE Autor SET nombre = :nombre, apellido = :apellido, fecha_nacimiento = :fecha_nacimiento WHERE dni = :dni";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':dni', $datos['dni']);
            $stmt->bindParam(':nombre', $datos['nombre']);
            $stmt->bindParam(':apellido', $datos['apellido']);
            $stmt->bindParam(':fecha_nacimiento', $datos['fecha_nacimiento']);
            return $stmt->execute();
        } catch (Exception $e) {
            error_log("Error al editar autor: " . $e->getMessage());
            return false;
        }
    }

    /* MÉTODO PARA ELIMINAR AUTORES DE LA BASE DE DATOS DESDE EL ADMINPANEL */
    public static function eliminarAutor($dni)
    {
        try {
            $conexion = Conexion::conectar();
            $sql = "DELETE FROM Autor WHERE dni = :dni";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':dni', $dni);
            return $stmt->execute();
        } catch (Exception $e) {
            error_log("Error al eliminar autor: " . $e->getMessage());
            return false;
        }
    }
}
