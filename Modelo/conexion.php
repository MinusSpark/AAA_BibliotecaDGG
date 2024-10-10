<?php
class Conexion {
    private static $host = "localhost";
    private static $db = "biblioteca";
    private static $usuario = "root";
    private static $contraseña = "";

    public static function conectar() {
        try {
            $conexion = new PDO("mysql:host=".self::$host.";dbname=".self::$db, self::$usuario, self::$contraseña);
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conexion;
        } catch (PDOException $e) {
            echo "Error en la conexión: " . $e->getMessage();
            return null;
        }
    }
}
?>
