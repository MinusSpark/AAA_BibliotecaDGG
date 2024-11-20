<?php
require_once 'conexion.php';

class ControladorLibro
{
    public static function buscarLibros($titulo)
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Libro WHERE titulo LIKE :titulo";
        $stmt = $conexion->prepare($sql);
        $stmt->bindValue(":titulo", "%$titulo%");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function obtenerLibrosDisponibles()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Libro WHERE stock > 0";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function registrarLibro($input)
    {
        $conexion = Conexion::conectar();
        $sql = "INSERT INTO Libro (isbn, titulo, autor, stock) VALUES (:isbn, :titulo, :autor, :stock)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":isbn", $input['isbn']);
        $stmt->bindParam(":titulo", $input['titulo']);
        $stmt->bindParam(":autor", $input['autor']);
        $stmt->bindParam(":stock", $input['stock']);
        return $stmt->execute();
    }

    public static function obtenerLibros()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT 
                    Libro.isbn, 
                    Libro.titulo, 
                    Libro.año, 
                    Libro.stock, 
                    Libro.portada, 
                    Autor.nombre AS autor_nombre, 
                    Autor.apellido AS autor_apellido, 
                    Editorial.nombre AS editorial_nombre,
                    Libro.genero
                FROM 
                    Libro 
                JOIN 
                    Autor ON Libro.autor_dni = Autor.dni 
                JOIN 
                    Editorial ON Libro.editorial_id = Editorial.id";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function obtenerLibrosPrestados()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT 
                    Libros_Prestados.id, 
                    Libros_Prestados.isbn, 
                    Libros_Prestados.usuario_dni, 
                    Libros_Prestados.fecha_prestamo, 
                    Libros_Prestados.fecha_devolucion, 
                    Usuario.nombre AS usuario_nombre, 
                    Usuario.apellido AS usuario_apellido,
                    Libro.titulo AS libro_titulo
                FROM 
                    Libros_Prestados 
                JOIN 
                    Usuario ON Libros_Prestados.usuario_dni = Usuario.dni 
                JOIN 
                    Libro ON Libros_Prestados.isbn = Libro.isbn";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function obtenerAutores()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Autor";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function obtenerEditoriales()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Editorial";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function eliminarLibro($isbn)
    {
        $conexion = Conexion::conectar();
        try {
            $sql = "DELETE FROM Libro WHERE isbn = :isbn";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(":isbn", $isbn);
            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Libro eliminado exitosamente'];
            } else {
                return ['status' => 'error', 'message' => 'Error al eliminar el libro'];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    public static function actualizarLibro($data)
    {
        $conexion = Conexion::conectar();
        try {
            $sql = "UPDATE Libro SET titulo = :titulo, año = :año, autor_dni = :autor, editorial_id = :editorial, genero = :genero, stock = :stock, portada = :portada WHERE isbn = :isbn";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(":isbn", $data['isbn']);
            $stmt->bindParam(":titulo", $data['titulo']);
            $stmt->bindParam(":año", $data['año']);
            $stmt->bindParam(":autor", $data['autor']);
            $stmt->bindParam(":editorial", $data['editorial']);
            $stmt->bindParam(":genero", $data['genero']);
            $stmt->bindParam(":stock", $data['stock']);
            $stmt->bindParam(":portada", $data['portada']);
            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Libro actualizado exitosamente'];
            } else {
                return ['status' => 'error', 'message' => 'Error al actualizar el libro'];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

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

    public static function obtenerReservasPendientes($dni)
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
}
