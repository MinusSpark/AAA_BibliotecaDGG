<?php
require_once 'conexion.php';

class ControladorUsuario
{
    public static function login($correo, $password)
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Usuario WHERE correo = :correo AND contraseña = :password";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":correo", $correo);
        $stmt->bindParam(":password", $password);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            return ['status' => 'success', 'user' => $usuario];
        } else {
            return ['status' => 'error', 'message' => 'Correo o contraseña incorrectos'];
        }
    }

    public static function registro($dni, $nombre, $apellido, $telefono, $correo, $password)
    {
        $conexion = Conexion::conectar();
        try {
            // Verificar si el usuario ya existe
            $sql = "SELECT * FROM Usuario WHERE correo = :correo";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(":correo", $correo);
            $stmt->execute();
            if ($stmt->fetch(PDO::FETCH_ASSOC)) {
                return ['status' => 'error', 'message' => 'El usuario ya existe.'];
            }

            // Insertar nuevo usuario
            $sql = "INSERT INTO Usuario (dni, nombre, apellido, telefono, correo, contraseña) VALUES (:dni, :nombre, :apellido, :telefono, :correo, :password)";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(":dni", $dni);
            $stmt->bindParam(":nombre", $nombre);
            $stmt->bindParam(":apellido", $apellido);
            $stmt->bindParam(":telefono", $telefono);
            $stmt->bindParam(":correo", $correo);
            $stmt->bindParam(":password", $password);
            return $stmt->execute();
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    public static function obtenerUsuarios()
    {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Usuario";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
