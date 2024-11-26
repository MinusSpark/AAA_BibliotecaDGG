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
                    Libro.anio, 
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
        try {
            $conexion = Conexion::conectar();
            $sql = "INSERT INTO Libro (isbn, titulo, anio, autor_dni, editorial_id, genero, stock, portada)
                VALUES (:isbn, :titulo, :anio, :autor_dni, :editorial_id, :genero, :stock, :portada)";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(':isbn', $data['isbn']);
            $stmt->bindParam(':titulo', $data['titulo']);
            $stmt->bindParam(':anio', $data['anio']);
            $stmt->bindParam(':autor_dni', $data['autor_dni']);
            $stmt->bindParam(':editorial_id', $data['editorial_id']);
            $stmt->bindParam(':genero', $data['genero']);
            $stmt->bindParam(':stock', $data['stock']);
            $stmt->bindParam(':portada', $data['portada']);
            $stmt->execute();
            return ['status' => 'success'];
        } catch (PDOException $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }


    /* MÉTODO PARA EDITAR/ACTUALIZAR DATOS DE LOS LIBROS DE LA BASE DE DATOS DESDE EL ADMINPANEL */
    public static function actualizarLibro($data) {}
}
