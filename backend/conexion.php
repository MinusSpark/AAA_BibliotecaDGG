<?php
class Conexion
{
    // Variables estáticas privadas que contienen los parámetros de conexión
    private static $host = "localhost";    // Dirección del servidor de la base de datos (en este caso, localhost)
    private static $db = "biblioteca";     // Nombre de la base de datos
    private static $usuario = "root";      // Usuario para acceder a la base de datos
    private static $contraseña = "";       // Contraseña para el usuario, en este caso está vacía para el acceso local por defecto

    // Método estático para establecer la conexión a la base de datos
    public static function conectar()
    {
        try {
            // Intentamos crear una nueva conexión PDO con los parámetros establecidos
            $conexion = new PDO("mysql:host=" . self::$host . ";dbname=" . self::$db, self::$usuario, self::$contraseña);

            // Establecemos que las excepciones de errores se manejen mediante excepciones (esto ayuda a manejar errores de forma más sencilla)
            $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Si la conexión es exitosa, la retornamos
            return $conexion;
        } catch (PDOException $e) {
            // Si ocurre un error, lo capturamos y mostramos el mensaje de error
            echo "Error en la conexión: " . $e->getMessage();
            return null; // Si no se pudo conectar, retornamos null
        }
    }
}
