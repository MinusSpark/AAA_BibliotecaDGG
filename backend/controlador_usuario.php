<?php
require_once 'conexion.php';

class ControladorUsuario {
    public static function login($correo, $password) {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Usuario WHERE correo = :correo AND contraseña = :password";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":password", $password);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function registro($dni, $nombre, $apellido, $telefono, $correo, $password) {
        $conexion = Conexion::conectar();
        $sql = "INSERT INTO Usuario (dni, nombre, apellido, telefono, correo, contraseña) VALUES (:dni, :nombre, :apellido, :telefono, :correo, :password)";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":dni", $dni);
        $stmt->bindParam(":nombre", $nombre);
        $stmt->bindParam(":apellido", $apellido);
        $stmt->bindParam(":telefono", $telefono);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":password", $password);
        return $stmt->execute();
    }

    public static function obtenerUsuarios() {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Usuario";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
