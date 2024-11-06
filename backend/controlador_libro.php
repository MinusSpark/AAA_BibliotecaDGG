<?php
require_once 'conexion.php';

class ControladorLibro {
    public static function buscarLibros($titulo) {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Libro WHERE titulo LIKE :titulo";
        $stmt = $conexion->prepare($sql);
        $stmt->bindValue(":titulo", "%$titulo%");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function obtenerLibrosDisponibles() {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Libro WHERE stock > 0";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function registrarLibro($input) {
        $conexion = Conexion::conectar();
        $sql = "INSERT INTO Libro (isbn, titulo, autor, stock) VALUES (:isbn, :titulo, :autor, :stock)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":isbn", $input['isbn']);
        $stmt->bindParam(":titulo", $input['titulo']);
        $stmt->bindParam(":autor", $input['autor']);
        $stmt->bindParam(":stock", $input['stock']);
        return $stmt->execute();
    }
}
?>
