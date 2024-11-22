<?php
require_once 'conexion.php';

class ControladorLibro
{

    // MÉTODO PARA IMPRIMIR LIBROS (HOME, SEARCH Y ADMIN PANEL)
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

    /* MÉTODO PARA ELIMINAR LIBROS DESDE EL ADMIN PANEL */
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

    /* MÉTODO PARA REGISTRAR LIBROS EN LA BASE DE DATOS DESDE EL ADMIN PANEL */
    public static function registrarLibro($data)
    {
        $conexion = Conexion::conectar();
        try {
            // Verificar existencia de autor y editorial
            $verificarAutor = $conexion->prepare("SELECT COUNT(*) FROM Autor WHERE dni = :autor_dni");
            $verificarAutor->bindParam(':autor_dni', $data['autor_dni']);
            $verificarAutor->execute();
            if ($verificarAutor->fetchColumn() == 0) {
                return ['status' => 'error', 'message' => 'El autor no existe'];
            }

            $verificarEditorial = $conexion->prepare("SELECT COUNT(*) FROM Editorial WHERE id = :editorial_id");
            $verificarEditorial->bindParam(':editorial_id', $data['editorial_id']);
            $verificarEditorial->execute();
            if ($verificarEditorial->fetchColumn() == 0) {
                return ['status' => 'error', 'message' => 'La editorial no existe'];
            }

            // Insertar el libro
            $sql = "INSERT INTO Libro (isbn, titulo, año, autor_dni, editorial_id, genero, stock, portada) 
                    VALUES (:isbn, :titulo, :año, :autor_dni, :editorial_id, :genero, :stock, :portada)";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(":isbn", $data['isbn']);
            $stmt->bindParam(":titulo", $data['titulo']);
            $stmt->bindParam(":año", $data['año']);
            $stmt->bindParam(":autor_dni", $data['autor_dni']);
            $stmt->bindParam(":editorial_id", $data['editorial_id']);
            $stmt->bindParam(":genero", $data['genero']);
            $stmt->bindParam(":stock", $data['stock']);
            $stmt->bindParam(":portada", $data['portada']);
            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Libro registrado exitosamente'];
            } else {
                return ['status' => 'error', 'message' => 'Error al registrar el libro'];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }


    /* MÉTODO PARA EDITAR/ACTUALIZAR DATOS DE LOS LIBROS DE LA BASE DE DATOS DESDE EL ADMINPANEL */
    public static function actualizarLibro($data)
    {
        $conexion = Conexion::conectar();
        try {
            $sql = "UPDATE Libro SET 
                    titulo = :titulo, 
                    año = :año, 
                    autor_dni = :autor_dni, 
                    editorial_id = :editorial_id, 
                    genero = :genero, 
                    stock = :stock, 
                    portada = :portada
                WHERE isbn = :isbn";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(":isbn", $data['isbn']);
            $stmt->bindParam(":titulo", $data['titulo']);
            $stmt->bindParam(":año", $data['año']);
            $stmt->bindParam(":autor_dni", $data['autor_dni']);
            $stmt->bindParam(":editorial_id", $data['editorial_id']);
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
}
