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
                    Libros_Prestados.dni_usuario, 
                    Libros_Prestados.fecha_prestamo, 
                    Libros_Prestados.fecha_devolucion, 
                    Usuario.nombre AS usuario_nombre, 
                    Usuario.apellido AS usuario_apellido,
                    Libro.titulo AS libro_titulo
                FROM 
                    Libros_Prestados 
                JOIN 
                    Usuario ON Libros_Prestados.dni_usuario = Usuario.dni 
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
        $sql = "SELECT * FROM Libros_Prestados WHERE dni_usuario = :dni_usuario AND fecha_devolucion IS NULL";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":dni_usuario", $dni);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function obtenerHistorialDePrestamos($dni)
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Libros_Prestados WHERE dni_usuario = :dni_usuario AND fecha_devolucion IS NOT NULL";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":dni_usuario", $dni);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
