<?php
require_once 'conexion.php';
require_once 'controlador_usuario.php';
require_once 'controlador_libro.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_GET['request']) ? $_GET['request'] : '';

switch ($method) {
    case 'GET':
        if ($request === 'books') {
            $libros = ControladorLibro::obtenerLibros(); // Asegúrate de tener esta función en el controlador
            if ($libros) {
                echo json_encode(['status' => 'success', 'data' => $libros]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron libros']);
            }
        } elseif ($request === 'borrowedBooks') {
            $librosPrestados = ControladorLibro::obtenerLibrosPrestados(); // Asegúrate de tener esta función en el controlador
            if ($librosPrestados) {
                echo json_encode(['status' => 'success', 'data' => $librosPrestados]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron libros prestados']);
            }
        } elseif ($request === 'users') {
            // Verificar si se ha pasado un 'dni' en la solicitud
            if (isset($_GET['dni'])) {
                $dni = $_GET['dni'];
                $usuario = ControladorUsuario::obtenerUsuarioPorDni($dni); // Obtener usuario por DNI
                if ($usuario) {
                    echo json_encode(['status' => 'success', 'data' => $usuario]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado']);
                }
            } else {
                // Solicitud para obtener todos los usuarios si no se pasa un 'dni'
                $usuarios = ControladorUsuario::obtenerUsuarios();
                if ($usuarios) {
                    echo json_encode(['status' => 'success', 'data' => $usuarios]);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'No se encontraron usuarios']);
                }
            }
        } elseif ($request === 'authors') {
            // Ruta para obtener autores
            $autores = ControladorLibro::obtenerAutores(); // Asegúrate de tener esta función en el controlador
            if ($autores) {
                echo json_encode(['status' => 'success', 'data' => $autores]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron autores']);
            }
        } elseif ($request === 'publishers') {
            // Ruta para obtener editoriales
            $editoriales = ControladorLibro::obtenerEditoriales(); // Asegúrate de tener esta función en el controlador
            if ($editoriales) {
                echo json_encode(['status' => 'success', 'data' => $editoriales]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron editoriales']);
            }
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
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
            // Solicitud de inicio de sesión
            $usuario = ControladorUsuario::login($input['email'], $input['password']);
            if ($usuario && isset($usuario['correo'])) {
                // Verificamos que el campo 'correo' esté en el objeto usuario
                echo json_encode(['status' => 'success', 'user' => $usuario]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Correo o contraseña incorrectos']);
            }
        }
        break;

    case 'DELETE':
        if ($request === 'deleteUser') {
            $dni = $_GET['dni']; // Obtención del DNI del usuario a eliminar
            if (isset($dni) && !empty($dni)) {
                $resultado = ControladorUsuario::eliminarUsuario($dni);
                echo json_encode($resultado);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'DNI del usuario no proporcionado']);
            }
        }
        break;

    case 'PUT':
        if ($request === 'updateUser') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorUsuario::actualizarUsuario($input);
            echo json_encode($resultado);
        }
        break;

    case 'OPTIONS':
        // Respuesta para solicitudes de verificación de CORS
        http_response_code(200);
        exit(0);

    default:
        // Respuesta para métodos HTTP no soportados
        echo json_encode(["message" => "Método no soportado"]);
        break;
}
