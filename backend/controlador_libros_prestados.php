<?php
require_once 'conexion.php';
require_once 'controlador_reservas.php';

class ControladorLibrosPrestados
{

    /* MÉTODO PARA IMPRIMIR LOS LIBROS PRESTAODOS EN EL ADMIN PANEL */

    public static function obtenerLibrosPrestados()
    {
        try {
            $conexion = Conexion::conectar();
            $sql = "
                SELECT 
                    lp.id,
                    lp.libro_isbn AS isbn,
                    l.titulo AS libro_titulo,
                    lp.usuario_dni AS dni_usuario,
                    u.nombre AS usuario_nombre,
                    u.apellido AS usuario_apellido,
                    lp.fecha_prestamo,
                    lp.fecha_devolucion
                FROM libros_prestados lp
                JOIN libro l ON lp.libro_isbn = l.isbn
                JOIN usuario u ON lp.usuario_dni = u.dni
                ORDER BY lp.fecha_prestamo DESC";

            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            error_log("Error al obtener libros prestados: " . $e->getMessage());
            return [];
        }
    }

    public static function devolverLibro($borrowedBookId)
    {
        try {
            $conexion = Conexion::conectar();

            // Obtener los datos del libro prestado
            $sql = "SELECT libro_isbn FROM libros_prestados WHERE id = :id AND fecha_devolucion IS NULL";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':id', $borrowedBookId, PDO::PARAM_INT);
            $stmt->execute();
            $prestamo = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$prestamo) {
                return false; // No se encontró el préstamo o ya fue devuelto
            }

            $libroIsbn = $prestamo['libro_isbn'];

            // Marcar el préstamo como devuelto
            $sql = "UPDATE libros_prestados SET fecha_devolucion = NOW() WHERE id = :id";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':id', $borrowedBookId, PDO::PARAM_INT);
            $stmt->execute();

            // Incrementar el stock del libro
            $sql = "UPDATE libro SET stock = stock + 1 WHERE isbn = :isbn";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':isbn', $libroIsbn, PDO::PARAM_STR);
            $stmt->execute();

            // Procesar la lista de espera
            ControladorReservas::procesarListaDeEspera($libroIsbn);

            return true;
        } catch (Exception $e) {
            error_log("Error al devolver libro: " . $e->getMessage());
            return false;
        }
    }



    /* MÉTODO PARA IMPRIMIR LOS LIBROS PRESTADOS AL USUARIO EN EL USER PANEL */
    public static function obtenerLibrosPrestadosPorUsuario($dni)
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT lp.*, l.titulo, l.anio, l.portada 
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
        $sql = "SELECT lp.*, l.titulo, l.anio, l.portada 
            FROM Libros_Prestados lp
            JOIN Libro l ON lp.libro_isbn = l.isbn
            WHERE lp.usuario_dni = :usuario_dni AND lp.fecha_devolucion IS NOT NULL";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":usuario_dni", $dni);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
