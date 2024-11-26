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
        
    }


    /* MÉTODO PARA EDITAR/ACTUALIZAR DATOS DE LOS LIBROS DE LA BASE DE DATOS DESDE EL ADMINPANEL */
    public static function actualizarLibro($data)
    {
        
    }
}
