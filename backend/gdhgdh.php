public static function borrarEvento($id)
{
    $conexion = Conexion::conectar();
    if ($conexion) {
        try {
            $conexion->beginTransaction();

            // Obtener los usuarios inscritos en el evento antes de eliminarlo
            $query = "SELECT usuario_dni FROM inscripciones WHERE evento_id = :id";
            $stmt = $conexion->prepare($query);
            $stmt->execute([':id' => $id]);
            $usuariosInscritos = $stmt->fetchAll(PDO::FETCH_COLUMN);

            // Eliminar las inscripciones asociadas al evento
            $query = "DELETE FROM inscripciones WHERE evento_id = :id";
            $stmt = $conexion->prepare($query);
            $stmt->execute([':id' => $id]);

            // Eliminar el evento
            $query = "DELETE FROM eventos WHERE id = :id";
            $stmt = $conexion->prepare($query);
            $stmt->execute([':id' => $id]);

            // Crear una notificación para los usuarios inscritos
            foreach ($usuariosInscritos as $dni) {
                $query = "INSERT INTO notificaciones (usuario_dni, mensaje) VALUES (:usuario_dni, :mensaje)";
                $stmt = $conexion->prepare($query);
                $stmt->execute([':usuario_dni' => $dni, ':mensaje' => 'El evento que anteriormente te habías inscrito se ha cancelado, contacta con la biblioteca DGG para más información']);
            }

            $conexion->commit();
            return ['status' => 'success', 'message' => 'Evento eliminado correctamente'];
        } catch (Exception $e) {
            $conexion->rollBack();
            return ['status' => 'error', 'message' => 'Error al eliminar el evento: ' . $e->getMessage()];
        }
    } else {
        return ['status' => 'error', 'message' => 'Error de conexión a la base de datos'];
    }
}
