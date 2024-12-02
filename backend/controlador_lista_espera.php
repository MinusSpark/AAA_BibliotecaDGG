<?php
require_once 'conexion.php';

class ControladorListaEspera {
    private $conexion;

    public function __construct() {
        $this->conexion = Conexion::conectar();
    }

    /* MÉTODO PARA IMPRIMIR LA LISTAS DE ESPERA PARA RESERVAR DE UN USUARIO EN EL USERPANEL */
    public function obtenerListaEsperaUsuario($dni) {
        try {
            $query = $this->conexion->prepare("
                SELECT le.id, le.fecha_registro, l.titulo 
                FROM lista_espera le
                INNER JOIN libro l ON le.libro_isbn = l.isbn
                WHERE le.usuario_dni = :dni
            ");
            $query->bindParam(':dni', $dni);
            $query->execute();

            $resultado = $query->fetchAll(PDO::FETCH_ASSOC);

            return [
                'status' => 'success',
                'data' => $resultado
            ];
        } catch (Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Error al obtener la lista de espera: ' . $e->getMessage()
            ];
        }
    }
}
