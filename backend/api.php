<?php

require_once 'controlador_usuario.php';
require_once 'controlador_libro.php';
require_once 'controlador_admin.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_GET['request']) ? $_GET['request'] : '';

switch ($method) {
    case 'GET':
        // Solicitudes para obtener información
        if ($request === 'books') {
            $libros = ControladorLibro::obtenerLibros();
            if ($libros) {
                echo json_encode(['status' => 'success', 'data' => $libros]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron libros']);
            }
        } elseif ($request === 'borrowedBooks') {
            $librosPrestados = ControladorLibro::obtenerLibrosPrestados();
            if ($librosPrestados) {
                echo json_encode(['status' => 'success', 'data' => $librosPrestados]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron libros prestados']);
            }
        } elseif ($request === 'reservasPendientes') {
            $query = "SELECT r.id, r.usuario_dni, u.nombre, r.libro_isbn, l.titulo, r.fecha_reserva 
                      FROM reservas r
                      JOIN usuario u ON r.usuario_dni = u.dni
                      JOIN libro l ON r.libro_isbn = l.isbn";
            $result = $conn->query($query);
            $reservas = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode(['status' => 'success', 'data' => $reservas]);
        } elseif ($request === 'users') {
            if (isset($_GET['dni'])) {
                $dni = $_GET['dni'];
                $usuario = ControladorUsuario::obtenerUsuarioPorDni($dni);
                if ($usuario) {
                    echo json_encode(['status' => 'success', 'data' => $usuario]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
                }
            } else {
                $usuarios = ControladorUsuario::obtenerUsuarios();
                if ($usuarios) {
                    echo json_encode(['status' => 'success', 'data' => $usuarios]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'No se encontraron usuarios']);
                }
            }
        } elseif ($request === 'currentLoans') {
            // Ruta para obtener préstamos actuales
            if (isset($_GET['dni'])) {
                $dni = $_GET['dni'];
                $loans = ControladorLibro::obtenerLibrosPrestadosPorUsuario($dni);
                if ($loans) {
                    echo json_encode(['status' => 'success', 'data' => $loans]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'No se encontraron préstamos actuales']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'DNI no proporcionado']);
            }
        } elseif ($request === 'loanHistory') {
            // Ruta para obtener historial de préstamos
            if (isset($_GET['dni'])) {
                $dni = $_GET['dni'];
                $history = ControladorLibro::obtenerHistorialDePrestamos($dni);
                if ($history) {
                    echo json_encode(['status' => 'success', 'data' => $history]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'No se encontraron datos de historial']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'DNI no proporcionado']);
            }
        } elseif ($request === 'authors') {
            $autores = ControladorLibro::obtenerAutores();
            if ($autores) {
                echo json_encode(['status' => 'success', 'data' => $autores]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron autores']);
            }
        } elseif ($request === 'publishers') {
            $editoriales = ControladorLibro::obtenerEditoriales();
            if ($editoriales) {
                echo json_encode(['status' => 'success', 'data' => $editoriales]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron editoriales']);
            }
        } elseif ($request === 'administrators') {
            $administradores = ControladorAdmin::obtenerAdministradores();
            if ($administradores) {
                echo json_encode(['status' => 'success', 'data' => $administradores]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron administradores']);
            }
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        file_put_contents('debug.txt', print_r($input, true));
        if ($request === 'registerUser') {
            // Solicitud para registrar un nuevo usuario
            $resultado = ControladorUsuario::registro(
                $input['dni'],
                $input['nombre'],
                $input['apellido'],
                $input['telefono'],
                $input['correo'],
                $input['password']
            );
            echo json_encode($resultado);
        } elseif ($request === 'login') {
            $usuario = ControladorUsuario::login($input['email'], $input['password']);
            if ($usuario && isset($usuario['correo'])) {
                echo json_encode(['status' => 'success', 'user' => $usuario]); // Una sola copia del usuario
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Correo o contraseña incorrectos']);
            }
        } elseif ($request === 'registerBook') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorLibro::registrarLibro($input);
            echo json_encode($resultado);
        } elseif ($request === 'addAuthor') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorAutor::registrarAutor($input);
            echo json_encode($resultado);
        } elseif ($request === 'addPublisher') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorEditorial::registrarEditorial($input);
            echo json_encode($resultado);
        } elseif ($request === 'reservarLibro') {
            // Solicitud para reservar un libro
            $usuario_dni = $_POST['usuario_dni'];
            $libro_isbn = $_POST['libro_isbn'];

            $query = "INSERT INTO reservas (usuario_dni, libro_isbn) VALUES ('$usuario_dni', '$libro_isbn')";
            if ($conn->query($query)) {
                echo json_encode(['status' => 'success', 'message' => 'Reserva creada exitosamente.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al crear la reserva.']);
            }
        } elseif ($request === 'aceptarReserva') {
            // Solicitud para aceptar una reserva y crear el préstamo
            $reserva_id = $_POST['reserva_id'];

            $query_reserva = "SELECT * FROM reservas WHERE id = '$reserva_id'";
            $reserva = $conn->query($query_reserva)->fetch_assoc();

            if ($reserva) {
                $usuario_dni = $reserva['usuario_dni'];
                $libro_isbn = $reserva['libro_isbn'];

                // Crear el préstamo
                $query_prestamo = "INSERT INTO libros_prestados (usuario_dni, libro_isbn) VALUES ('$usuario_dni', '$libro_isbn')";
                $conn->query($query_prestamo);

                // Actualizar el stock del libro
                $query_update_stock = "UPDATE libro SET stock = stock - 1 WHERE isbn = '$libro_isbn'";
                $conn->query($query_update_stock);

                // Eliminar la reserva
                $query_delete_reserva = "DELETE FROM reservas WHERE id = '$reserva_id'";
                $conn->query($query_delete_reserva);

                echo json_encode(['status' => 'success', 'message' => 'Reserva aceptada y préstamo creado.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Reserva no encontrada.']);
            }
        }
        break;

    case 'DELETE':
        if ($request === 'deleteUser') {
            $dni = $_GET['dni'];
            if (isset($dni) && !empty($dni)) {
                $resultado = ControladorUsuario::eliminarUsuario($dni);
                echo json_encode($resultado);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'DNI del usuario no proporcionado']);
            }
        } elseif ($request === 'deleteBook') {
            $isbn = $_GET['isbn'];
            if (isset($isbn) && !empty($isbn)) {
                $resultado = ControladorLibro::eliminarLibro($isbn);
                echo json_encode($resultado);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'ISBN no proporcionado']);
            }
        } elseif ($request === 'deleteAuthor') {
            $dni = $_GET['dni'];
            $resultado = ControladorAutor::eliminarAutor($dni);
            echo json_encode($resultado);
        } elseif ($request === 'deletePublisher') {
            $id = $_GET['id'];
            $resultado = ControladorEditorial::eliminarEditorial($id);
            echo json_encode($resultado);
        } elseif ($request === 'deleteReserva') {
            $reserva_id = $_GET['id'];
            $query_delete_reserva = "DELETE FROM reservas WHERE id = '$reserva_id'";
            if ($conn->query($query_delete_reserva)) {
                echo json_encode(['status' => 'success', 'message' => 'Reserva eliminada exitosamente.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al eliminar la reserva.']);
            }
        }
        break;

    case 'PUT':
        if ($request === 'updateUser') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorUsuario::actualizarUsuario($input);
            echo json_encode($resultado);
        } elseif ($request === 'updateBook') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorLibro::actualizarLibro($input);
            echo json_encode($resultado);
        } elseif ($request === 'updateAuthor') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorAutor::actualizarAutor($input);
            echo json_encode($resultado);
        } elseif ($request === 'updatePublisher') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorEditorial::actualizarEditorial($input);
            echo json_encode($resultado);
        }
        break;

    case 'OPTIONS':
        // reespuesta para solicitudes de verificación de CORS
        http_response_code(200);
        exit(0);

    default:
        //respuesta para métodos HTTP no soportados
        echo json_encode(["message" => "Método no soportado"]);
        break;
}
