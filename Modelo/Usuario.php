<?php
require_once("conexion.php");

class Usuario {
    public static function verificarLogin($correo, $contraseña) {
        $conexion = Conexion::conectar();
        $query = $conexion->prepare("SELECT * FROM Usuario WHERE correo = ? AND contraseña = ?");
        $query->execute([$correo, $contraseña]);
        return $query->fetch(PDO::FETCH_ASSOC);
    }

        


}
?>
