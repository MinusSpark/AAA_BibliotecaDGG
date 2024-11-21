<?php
require_once 'conexion.php';

class ControladorLibrosPrestados
{

    /* MÉTODO PARA IMPRIMIR LOS LIBROS PRESTADOS AL USUARIO EN EL USER PANEL */
    public static function obtenerLibrosPrestadosPorUsuario($dni)
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT lp.*, l.titulo, l.año, l.portada 
            FROM Libros_Prestados lp
            JOIN Libro l ON lp.libro_isbn = l.isbn
            WHERE lp.usuario_dni = :usuario_dni AND lp.fecha_devolucion IS NULL";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":usuario_dni", $dni);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /* MÉTODO PARA IMPRIMIR EL HISTORIAL DE PRÉSTAMOS EN EL USER PANEL */
    public static function obtenerHistorialDePrestamos($dni)
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT lp.*, l.titulo, l.año, l.portada 
            FROM Libros_Prestados lp
            JOIN Libro l ON lp.libro_isbn = l.isbn
            WHERE lp.usuario_dni = :usuario_dni AND lp.fecha_devolucion IS NOT NULL";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":usuario_dni", $dni);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
