<?php
require_once 'conexion.php';
require_once 'controlador_usuario.php';
require_once 'controlador_libro.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));

switch ($method) {
    case 'GET':
        if ($request[0] === 'books') {
            echo json_encode(ControladorLibro::obtenerLibrosDisponibles());
        } elseif ($request[0] === 'users') {
            echo json_encode(ControladorUsuario::obtenerUsuarios());
        }
        break;
    
    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        if ($request[0] === 'registerUser') {
            $dni = $input['dni'];
            $nombre = $input['nombre'];
            $apellido = $input['apellido'];
            $telefono = $input['telefono'];
            $correo = $input['correo'];
            $password = $input['password'];
            echo json_encode(ControladorUsuario::registro($dni, $nombre, $apellido, $telefono, $correo, $password));
        } elseif ($request[0] === 'registerBook') {
            echo json_encode(ControladorLibro::registrarLibro($input));
        }
        break;

    default:
        echo json_encode(["message" => "Método no soportado"]);
        break;
}
?>
