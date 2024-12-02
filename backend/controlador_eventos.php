<?php
require_once 'conexion.php';

class ControladorEventos
{

    /* MÉTODO PARA OBTENER EVENTOS DEL CALENDARIO */
    public static function obtenerEventos()
    {
        $conexion = Conexion::conectar();
        if ($conexion) {
            $query = "SELECT * FROM eventos";
            $stmt = $conexion->query($query);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            return null;
        }
    }

    /* MÉTODO PARA AÑADIR EVENTOS AL CALENDARIO (SIENDO ADMINISTRADOR) */
    public static function añadirEvento($fecha, $descripcion, $max_asistentes)
    {
        $conexion = Conexion::conectar();
        if ($conexion) {
            $query = "INSERT INTO eventos (fecha, descripcion, max_asistentes, asistentes_actuales) VALUES (:fecha, :descripcion, :max_asistentes, 0)";
            $stmt = $conexion->prepare($query);
            if ($stmt->execute([':fecha' => $fecha, ':descripcion' => $descripcion, ':max_asistentes' => $max_asistentes])) {
                return ['status' => 'success', 'message' => 'Evento añadido correctamente'];
            } else {
                return ['status' => 'error', 'message' => 'No se pudo añadir el evento'];
            }
        } else {
            return ['status' => 'error', 'message' => 'Error de conexión a la base de datos'];
        }
    }

    /* MÉTODO PARA ELIMIAR EVENTOS AL CALENDARIO (SIENDO ADMINISTRADOR) */
    public static function borrarEvento($id)
    {
        $conexion = Conexion::conectar();
        if ($conexion) {
            try {
                $conexion->beginTransaction();

                // Eliminar las inscripciones asociadas al evento
                $query = "DELETE FROM inscripciones WHERE evento_id = :id";
                $stmt = $conexion->prepare($query);
                $stmt->execute([':id' => $id]);

                // Eliminar el evento
                $query = "DELETE FROM eventos WHERE id = :id";
                $stmt = $conexion->prepare($query);
                $stmt->execute([':id' => $id]);

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

    /* MÉTODO PARA INSCRIBIR USUARIO A LOS EVENTOS DEL CALENDARIO DESDE INTERFAZ USUARIO */
    public static function inscribirUsuario($evento_id, $dni, $correo)
    {
        $conexion = Conexion::conectar();
        if ($conexion) {
            // Verificar si el usuario ya está inscrito
            $query = "SELECT * FROM inscripciones WHERE evento_id = :evento_id AND usuario_dni = :dni";
            $stmt = $conexion->prepare($query);
            $stmt->execute([':evento_id' => $evento_id, ':dni' => $dni]);
            $inscripcion = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($inscripcion) {
                return ['status' => 'error', 'message' => 'Ya estás inscrito a este evento'];
            }

            // Verificar si hay espacio en el evento
            $query = "SELECT max_asistentes, asistentes_actuales FROM eventos WHERE id = :evento_id";
            $stmt = $conexion->prepare($query);
            $stmt->execute([':evento_id' => $evento_id]);
            $evento = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($evento['asistentes_actuales'] < $evento['max_asistentes']) {
                // Inscribir al usuario
                $query = "INSERT INTO inscripciones (evento_id, usuario_dni, correo) VALUES (:evento_id, :usuario_dni, :correo)";
                $stmt = $conexion->prepare($query);
                $stmt->execute([':evento_id' => $evento_id, ':usuario_dni' => $dni, ':correo' => $correo]);

                // Actualizar contador de asistentes
                $query = "UPDATE eventos SET asistentes_actuales = asistentes_actuales + 1 WHERE id = :evento_id";
                $stmt = $conexion->prepare($query);
                return $stmt->execute([':evento_id' => $evento_id]) ? ['status' => 'success', 'message' => 'Inscripción realizada con éxito.'] : ['status' => 'error', 'message' => 'No se pudo inscribir al usuario'];
            } else {
                return ['status' => 'error', 'message' => 'El evento está completo'];
            }
        } else {
            return ['status' => 'error', 'message' => 'Error de conexión a la base de datos'];
        }
    }

    /* MÉTODO PARA DESINSCRIBIR USUSARIO DE UN EVENTO DEL CALENDARIO DESDE INTERFAZ USUARIO */
    public static function desinscribirUsuario($evento_id, $dni, $correo)
    {
        $conexion = Conexion::conectar();
        if ($conexion) {
            try {
                $conexion->beginTransaction();

                // Verificar si el usuario está inscrito
                $query = "SELECT * FROM inscripciones WHERE evento_id = :evento_id AND usuario_dni = :dni";
                $stmt = $conexion->prepare($query);
                $stmt->execute([':evento_id' => $evento_id, ':dni' => $dni]);
                $inscripcion = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($inscripcion) {
                    // Eliminar la inscripción del usuario
                    $query = "DELETE FROM inscripciones WHERE evento_id = :evento_id AND usuario_dni = :dni";
                    $stmt = $conexion->prepare($query);
                    $stmt->execute([':evento_id' => $evento_id, ':dni' => $dni]);

                    // Actualizar contador de asistentes
                    $query = "UPDATE eventos SET asistentes_actuales = asistentes_actuales - 1 WHERE id = :evento_id AND asistentes_actuales > 0";
                    $stmt = $conexion->prepare($query);
                    $stmt->execute([':evento_id' => $evento_id]);

                    $conexion->commit();
                    return ['status' => 'success', 'message' => 'Desinscripción realizada con éxito.'];
                } else {
                    return ['status' => 'error', 'message' => 'No estás inscrito a este evento.'];
                }
            } catch (Exception $e) {
                $conexion->rollBack();
                return ['status' => 'error', 'message' => 'Error al desinscribir usuario: ' . $e->getMessage()];
            }
        } else {
            return ['status' => 'error', 'message' => 'Error de conexión a la base de datos'];
        }
    }
}
