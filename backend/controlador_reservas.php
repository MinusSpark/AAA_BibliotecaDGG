<?php
require_once 'conexion.php';

class ControladorReservas {
/* MÉTODO PARA IMPRIMIR LAS RESERVAS PENDIENTES DE ACEPTACIÓN DE ADMINISTRADOR EN EL ADMIN PANEL */
    public static function obtenerReservasPendientes()
    {
        $conexion = Conexion::conectar();
        // Consulta sin necesidad de filtro por dni
        $sql = "SELECT reservas.id, Libro.titulo, reservas.usuario_dni, reservas.libro_isbn, reservas.fecha_reserva 
            FROM reservas 
            JOIN Libro ON reservas.libro_isbn = Libro.isbn";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    /* MÉTODO PARA IMPRIMIR LAS RESERVAS PENDIENTES DE UN USUARIO EN EL USER PANEL */
    public static function obtenerReservasPendientesUsuario($dni)
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT reservas.id, Libro.titulo, reservas.fecha_reserva 
            FROM reservas 
            JOIN Libro ON reservas.libro_isbn = Libro.isbn 
            WHERE reservas.usuario_dni = :dni";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':dni', $dni);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    
    /* MÉTODO PARA RESERVAR LIBRO DESDE EL HOME */
    public static function reservarLibro($dni, $isbn)
    {
        try {
            $conexion = Conexion::conectar();

            // Comprobar stock disponible
            $sqlCheckStock = "SELECT stock FROM Libro WHERE isbn = :isbn";
            $stmtCheckStock = $conexion->prepare($sqlCheckStock);
            $stmtCheckStock->bindParam(':isbn', $isbn);
            $stmtCheckStock->execute();
            $book = $stmtCheckStock->fetch(PDO::FETCH_ASSOC);

            if ($book['stock'] <= 0) {
                return false; // No hay stock disponible
            }

            // Registrar la reserva
            $sqlInsertReserva = "INSERT INTO reservas (usuario_dni, libro_isbn) VALUES (:dni, :isbn)";
            $stmtInsertReserva = $conexion->prepare($sqlInsertReserva);
            $stmtInsertReserva->bindParam(':dni', $dni);
            $stmtInsertReserva->bindParam(':isbn', $isbn);
            $stmtInsertReserva->execute();

            // Reducir el stock
            $sqlUpdateStock = "UPDATE Libro SET stock = stock - 1 WHERE isbn = :isbn";
            $stmtUpdateStock = $conexion->prepare($sqlUpdateStock);
            $stmtUpdateStock->bindParam(':isbn', $isbn);
            $stmtUpdateStock->execute();

            return true;
        } catch (Exception $e) {
            error_log("Error en reservarLibro: " . $e->getMessage());
            return false;
        }
    }

    /* MÉTODO PARA ACEPTAR RESERVAS COMO ADMINISTRADOR Y TRANSFORMARLAS EN PRÉSTAMOS DESDE EL ADMIN PANEL */
    public function convertirReservaEnPrestamo($reservationId)
    {
        $conexion = Conexion::conectar();

        // 1. Obtener los detalles de la reserva
        $query = "SELECT * FROM reservas WHERE id = ?";
        $stmt = $conexion->prepare($query);
        $stmt->execute([$reservationId]);
        $reservation = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($reservation) {
            $usuarioDni = $reservation['usuario_dni'];
            $libroIsbn = $reservation['libro_isbn'];

            try {
                // 2. Insertar en la tabla libros_prestados
                $insertQuery = "INSERT INTO libros_prestados (usuario_dni, libro_isbn) VALUES (?, ?)";
                $insertStmt = $conexion->prepare($insertQuery);
                $insertStmt->execute([$usuarioDni, $libroIsbn]);

                // 3. Eliminar la reserva de la tabla reservas
                $deleteQuery = "DELETE FROM reservas WHERE id = ?";
                $deleteStmt = $conexion->prepare($deleteQuery);
                $deleteStmt->execute([$reservationId]);

                // 4. Devolver el libro prestado con sus detalles
                $borrowedBookId = $conexion->lastInsertId();
                $borrowedBookQuery = "SELECT * FROM libros_prestados WHERE id = ?";
                $borrowedBookStmt = $conexion->prepare($borrowedBookQuery);
                $borrowedBookStmt->execute([$borrowedBookId]);
                $borrowedBook = $borrowedBookStmt->fetch(PDO::FETCH_ASSOC);

                return [
                    'status' => 'success',
                    'borrowedBook' => $borrowedBook
                ];
            } catch (PDOException $e) {
                return [
                    'status' => 'error',
                    'message' => 'Error al procesar la reserva: ' . $e->getMessage()
                ];
            }
        } else {
            return [
                'status' => 'error',
                'message' => 'Reserva no encontrada.'
            ];
        }
    }
}