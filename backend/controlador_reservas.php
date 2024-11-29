<?php
require_once 'conexion.php';

class ControladorReservas
{
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
        $sql = "SELECT 
                reservas.id, 
                Libro.titulo, 
                reservas.fecha_reserva, 
                TIMESTAMPDIFF(SECOND, reservas.fecha_reserva, NOW()) AS segundos_transcurridos
            FROM reservas 
            JOIN Libro ON reservas.libro_isbn = Libro.isbn 
            WHERE reservas.usuario_dni = :dni";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':dni', $dni);
        $stmt->execute();
        $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Calcular el tiempo restante en horas y minutos
        foreach ($reservas as &$reserva) {
            $segundosTranscurridos = $reserva['segundos_transcurridos'];
            $segundosTotales = 24 * 60 * 60; // 24 horas en segundos
            $segundosRestantes = $segundosTotales - $segundosTranscurridos;

            if ($segundosRestantes <= 0) {
                // Si el tiempo ha expirado, se puede eliminar la reserva automáticamente
                $reserva['tiempo_restante'] = "Expirada";
            } else {
                $horas = floor($segundosRestantes / 3600);
                $minutos = floor(($segundosRestantes % 3600) / 60);
                $reserva['tiempo_restante'] = "{$horas}h {$minutos}m";
            }
        }
        return $reservas;
    }

    /* MÉTODO PARA RESERVAR LIBRO DESDE EL HOME */
    public static function reservarLibro($dni, $isbn)
    {
        try {
            $conexion = Conexion::conectar();

            // Verificar el número de reservas existentes
            $sqlCountReservations = "SELECT COUNT(*) AS total FROM reservas WHERE usuario_dni = :dni AND fecha_reserva > (NOW() - INTERVAL 1 DAY)";
            $stmtCountReservations = $conexion->prepare($sqlCountReservations);
            $stmtCountReservations->bindParam(':dni', $dni);
            $stmtCountReservations->execute();
            $totalReservas = $stmtCountReservations->fetchColumn();

            if ($totalReservas >= 3) {
                return false; // No se permite más de 3 reservas activas
            }

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

    public static function agregarALaListaDeEspera($dni, $isbn)
    {
        try {
            $conexion = Conexion::conectar();
            $sql = "INSERT INTO lista_espera (usuario_dni, libro_isbn) VALUES (:dni, :isbn)";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':dni', $dni);
            $stmt->bindParam(':isbn', $isbn);
            $stmt->execute();
            return true;
        } catch (Exception $e) {
            error_log("Error en agregarALaListaDeEspera: " . $e->getMessage());
            return false;
        }
    }

    public static function procesarListaDeEspera($isbn)
    {
        try {
            $conexion = Conexion::conectar();
            // Obtener el primer usuario en la lista de espera
            $sql = "SELECT * FROM lista_espera WHERE libro_isbn = :isbn ORDER BY fecha_registro ASC LIMIT 1";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':isbn', $isbn);
            $stmt->execute();
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($usuario) {
                // Reservar el libro automáticamente
                $resultadoReserva = self::reservarLibro($usuario['usuario_dni'], $isbn);
                if ($resultadoReserva) {
                    // Eliminar de la lista de espera
                    $sqlDelete = "DELETE FROM lista_espera WHERE id = :id";
                    $stmtDelete = $conexion->prepare($sqlDelete);
                    $stmtDelete->bindParam(':id', $usuario['id']);
                    $stmtDelete->execute();
                }
            }
            return true;
        } catch (Exception $e) {
            error_log("Error en procesarListaDeEspera: " . $e->getMessage());
            return false;
        }
    }
}
