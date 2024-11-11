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

        if ($usuario && isset($usuario['correo'])) {
            return $usuario;
        } else {
            return null;
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
            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Usuario registrado exitosamente'];
            } else {
                return ['status' => 'error', 'message' => 'Error al registrar el usuario'];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    public static function obtenerUsuarios() {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Usuario";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
 
    public static function eliminarUsuario($dni) {
        $conexion = Conexion::conectar();
        try {
            $sql = "DELETE FROM Usuario WHERE dni = :dni";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(":dni", $dni);
            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Usuario eliminado exitosamente'];
            } else {
                return ['status' => 'error', 'message' => 'Error al eliminar el usuario'];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    public static function actualizarUsuario($data) {
        $conexion = Conexion::conectar();
        try {
            $sql = "UPDATE Usuario SET nombre = :nombre, apellido = :apellido, telefono = :telefono, correo = :correo WHERE dni = :dni";
            $stmt = $conexion->prepare($sql);
            $stmt->bindParam(":dni", $data['dni']);
            $stmt->bindParam(":nombre", $data['nombre']);
            $stmt->bindParam(":apellido", $data['apellido']);
            $stmt->bindParam(":telefono", $data['telefono']);
            $stmt->bindParam(":correo", $data['correo']);
            if ($stmt->execute()) {
                return ['status' => 'success', 'message' => 'Usuario actualizado exitosamente'];
            } else {
                return ['status' => 'error', 'message' => 'Error al actualizar el usuario'];
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
    
    public static function obtenerUsuarioPorDni($dni) {
        $conexion = Conexion::conectar();
        $sql = "SELECT * FROM Usuario WHERE dni = :dni";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(":dni", $dni);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        return $usuario ? ['status' => 'success', 'data' => $usuario] : ['status' => 'error', 'message' => 'Usuario no encontrado'];
    }
    
    

}