<?php

require_once 'controlador_admin.php';
require_once 'controlador_autor.php';
require_once 'controlador_editorial.php';
require_once 'controlador_libro.php';
require_once 'controlador_libros_prestados.php';
require_once 'controlador_reservas.php';
require_once 'controlador_usuario.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_GET['request']) ? $_GET['request'] : '';

switch ($method) {
    case 'GET':

        /* IMPRIMIR LIBROS (HOME, SEARCH Y ADMIN PANEL) */
        if ($request === 'books') {
            $libros = ControladorLibro::obtenerLibros();
            if ($libros) {
                echo json_encode(['status' => 'success', 'data' => $libros]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron libros']);
            }
        } 
        
        /* IMRPRIMIR TABLAS EN EL ADMIN PANEL (reservas, usuarios, autores, publishers, administrators) */
        elseif ($request === 'pendingReservations') {
            $reservas = ControladorReservas::obtenerReservasPendientes(); // Cambia aquí
            if ($reservas) {
                echo json_encode(['status' => 'success', 'data' => $reservas]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No hay reservas pendientes.']);
            }
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
        } elseif ($request === 'authors') {
            $autores = ControladorAutor::obtenerAutores();
            if ($autores) {
                echo json_encode(['status' => 'success', 'data' => $autores]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron autores']);
            }
        } elseif ($request === 'publishers') {
            $editoriales = ControladorEditorial::obtenerEditoriales();
            if ($editoriales) {
                echo json_encode(['status' => 'success', 'data' => $editoriales]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron editoriales']);
            }
        } 
        
        /* IMPRIMIR DATOS DE USER PANEL (prestamos, hitorial de prestamos y reservas pendientes) */
        elseif ($request === 'currentLoans') {
            if (isset($_GET['dni'])) {
                $dni = $_GET['dni'];
                $loans = ControladorLibrosPrestados::obtenerLibrosPrestadosPorUsuario($dni);
                if ($loans) {
                    echo json_encode(['status' => 'success', 'data' => $loans]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'No se encontraron préstamos actuales']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'DNI no proporcionado']);
            }
        } elseif ($request === 'loanHistory') {
            if (isset($_GET['dni'])) {
                $dni = $_GET['dni'];
                $history = ControladorLibrosPrestados::obtenerHistorialDePrestamos($dni);
                if ($history) {
                    echo json_encode(['status' => 'success', 'data' => $history]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'No se encontraron datos de historial']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'DNI no proporcionado']);
            }
        } elseif ($request === 'pendingReservationsUsuario') {
            $dni = isset($_GET['dni']) ? $_GET['dni'] : null;

            if ($dni) {
                $reservas = ControladorReservas::obtenerReservasPendientesUsuario($dni);
                if ($reservas) {
                    echo json_encode(['status' => 'success', 'data' => $reservas]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'No hay reservas pendientes.']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'El DNI no ha sido proporcionado.']);
            }
        }
        break;

    case 'POST':        
        $input = json_decode(file_get_contents("php://input"), true);

        /* REGISTRO Y LOGIN PARA INTERFAZ DE USUARIO */
        if ($request === 'registerUser') {
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
        } 
        
        /* RESERVA LIBROS DESDE INTERFAZ USUARIO */
        elseif ($request === 'reserveBook') {
            $dni = $input['dni'];
            $isbn = $input['isbn'];
            $resultado = ControladorReservas::reservarLibro($dni, $isbn);
            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Reserva realizada con éxito.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se pudo realizar la reserva.']);
            }
        } 
        
        
        /* CONVERTIR RESERVAS A PRESTAMOS DESDE INTERFAZ ADMNISTRADOR */
        elseif ($request === 'convertReservation') {
            $reservationId = $input['reservationId'];

            $controladorLibro = new ControladorReservas();

            $result = $controladorLibro->convertirReservaEnPrestamo($reservationId);

            echo json_encode($result);
        }
        break;

    case 'DELETE':
        
        /* ELIMINAR LIBRO DESDE INTERFAZ ADMINISTRADOR */
        if ($request === 'deleteBook') {
            $isbn = $_GET['isbn'];
            if (isset($isbn) && !empty($isbn)) {
                $resultado = ControladorLibro::eliminarLibro($isbn);
                echo json_encode($resultado);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'ISBN no proporcionado']);
            }
        } elseif ($request === 'deleteReserva') {
        }
        break;

    case 'PUT':

        /* ACTUALIZAR/EDITAR USUARIO DESDE INTERFAZ ADMINISTRADOR */
        if ($request === 'updateUser') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorUsuario::actualizarUsuario($input);
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
