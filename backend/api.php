<?php
require_once 'conexion.php';
require_once 'controlador_usuario.php';
require_once 'controlador_libro.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$request = isset($_GET['request']) ? $_GET['request'] : '';

switch ($method) {
    case 'GET':
        if ($request === 'books') {
            // Solicitud para obtener los libros disponibles
            $libros = ControladorLibro::obtenerLibrosDisponibles();
            if ($libros) {
                echo json_encode(['status' => 'success', 'data' => $libros]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron libros disponibles']);
            }
        } elseif ($request === 'users') {
            // Solicitud para obtener todos los usuarios
            $usuarios = ControladorUsuario::obtenerUsuarios();
            if ($usuarios) {
                echo json_encode(['status' => 'success', 'data' => $usuarios]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron usuarios']);
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
            if ($usuario) {
                echo json_encode(['status' => 'success', 'user' => $usuario]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Correo o contraseña incorrectos']);
            }
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
