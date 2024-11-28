<?php

require_once 'controlador_admin.php';
require_once 'controlador_autor.php';
require_once 'controlador_donacion.php';
require_once 'controlador_editorial.php';
require_once 'controlador_libro.php';
require_once 'controlador_libros_prestados.php';
require_once 'controlador_reservas.php';
require_once 'controlador_usuario.php';
require_once 'controlador_eventos.php';
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

        /* IMRPRIMIR TABLAS EN EL ADMIN PANEL (reservas, usuarios, autores, publishers, administrators) */ elseif ($request === 'pendingReservations') {
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
        } elseif ($request === 'borrowedBooks') {
            // Llamar al controlador para obtener los libros prestados
            $borrowedBooks = ControladorLibrosPrestados::obtenerLibrosPrestados();
            echo json_encode([
                'status' => 'success',
                'data' => $borrowedBooks
            ]);
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

        /* IMPRIMIR DATOS DE USER PANEL (prestamos, hitorial de prestamos y reservas pendientes) */ elseif ($request === 'currentLoans') {
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
        } /* OBTENER TODAS LAS DONACIONES */ elseif ($request === 'donations') {
            $donaciones = ControladorDonacion::obtenerDonaciones();
            if ($donaciones) {
                echo json_encode(['status' => 'success', 'data' => $donaciones]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se encontraron donaciones']);
            }
        }

        // Obtener eventos
        if ($_GET['request'] === 'getEvents') {
            $eventos = ControladorEventos::obtenerEventos();
            if ($eventos) {
                echo json_encode(['status' => 'success', 'data' => $eventos]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al obtener eventos']);
            }
        }

        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);

        /* REGISTRO Y LOGIN PARA INTERFAZ DE USUARIO Y TAMBIÉN DESDE ADMINPANEL */
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

        /* REGISTRAR LIBROS, AUTORES Y EDITORIALES DESDE EL ADMIN PANEL */ elseif ($request === 'registerBook') {
            $input = json_decode(file_get_contents("php://input"), true);
            echo json_encode(ControladorLibro::registrarLibro($input));
        } elseif ($request === 'addAuthor') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorAutor::agregarAutor($input);
            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Autor añadido correctamente']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se pudo añadir el autor']);
            }
        } elseif ($request === 'addPublisher') {
            $resultado = ControladorEditorial::agregarEditorial($input);
            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Editorial añadida correctamente']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al añadir la editorial']);
            }
        }

        /* DEVOLUCIÓN DE LIBROS PRESTADOS DESDE EL ADMIN PANEL */ elseif ($request === 'returnBook') {
            $borrowedBookId = $input['borrowedBookId'];

            $resultado = ControladorLibrosPrestados::devolverLibro($borrowedBookId);
            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Libro devuelto con éxito.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se pudo devolver el libro.']);
            }
        }

        /* RESERVA LIBROS DESDE INTERFAZ USUARIO */ elseif ($request === 'reserveBook') {
            $dni = $input['dni'];
            $isbn = $input['isbn'];
            $resultado = ControladorReservas::reservarLibro($dni, $isbn);
            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Reserva realizada con éxito.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se pudo realizar la reserva.']);
            }
        }


        /* CONVERTIR RESERVAS A PRESTAMOS DESDE INTERFAZ ADMNISTRADOR */ elseif ($request === 'convertReservation') {
            $reservationId = $input['reservationId'];

            $controladorLibro = new ControladorReservas();

            $result = $controladorLibro->convertirReservaEnPrestamo($reservationId);

            echo json_encode($result);
        }/* REGISTRAR UNA NUEVA DONACIÓN */ elseif ($request === 'createDonation') {
            $resultado = ControladorDonacion::crearDonacion(
                $input['nombre'],
                $input['monto'],
                $input['mensaje']
            );
            if ($resultado['status'] === 'success') {
                echo json_encode(['status' => 'success', 'message' => 'Donación registrada exitosamente.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se pudo registrar la donación.']);
            }
        }  
        
        elseif ($request === 'addEvent') {
            $fecha = $input['fecha'];
            $descripcion = $input['descripcion'];
            $max_asistentes = $input['max_asistentes'];
            $resultado = ControladorEventos::añadirEvento($fecha, $descripcion, $max_asistentes);
            echo json_encode($resultado);
        }


        // Añadir evento
        elseif ($request === 'inscribirUsuario') {
            $evento_id = $input['evento_id'];
            $dni = $input['dni'];
            $correo = $input['correo'];
            $resultado = ControladorEventos::inscribirUsuario($evento_id, $dni, $correo);
            echo json_encode($resultado ? ['status' => 'success'] : ['status' => 'error', 'message' => 'Error al inscribir usuario']);
        }
    
        // Desinscribir usuario de evento
        elseif ($request === 'desinscribirUsuario') {
            $evento_id = $input['evento_id'];
            $dni = $input['dni'];
            $correo = $input['correo'];
            $resultado = ControladorEventos::desinscribirUsuario($evento_id, $dni, $correo);
            echo json_encode($resultado);
        }
    

        elseif ($request === 'deleteEvent') {
            $id = $input['id'];
            $resultado = ControladorEventos::borrarEvento($id);
            echo json_encode($resultado);
        }
    
        break;

    case 'DELETE':

        /* ELIMINAR USUARIO DESDE INTERFAZ ADMINISTRADOR */
        if ($request === 'deleteUser') {
            $dni = $_GET['dni'];
            if (isset($dni) && !empty($dni)) {
                $resultado = ControladorUsuario::eliminarUsuario($dni);
                echo json_encode($resultado);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'DNI no proporcionado']);
            }
        } /* ELIMINAR LIBRO DESDE INTERFAZ ADMINISTRADOR */ elseif ($request === 'deleteBook') {
            $isbn = $_GET['isbn'];
            if (isset($isbn) && !empty($isbn)) {
                $resultado = ControladorLibro::eliminarLibro($isbn);
                echo json_encode($resultado);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'ISBN no proporcionado']);
            }
        } /* ELIMINAR AUTORES DESDE ADMIN PANEL */ elseif ($request === 'deleteAuthor') {
            $dni = $_GET['dni'];
            $resultado = ControladorAutor::eliminarAutor($dni);
            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Autor eliminado correctamente']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se pudo eliminar el autor']);
            }
        } /* ELIMINAR EDITORIALES DESDE ADMIN PANEL */ elseif ($request === 'deletePublisher' && isset($_GET['id'])) {
            $id = $_GET['id'];
            $resultado = ControladorEditorial::eliminarEditorial($id);
            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Editorial eliminada correctamente']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al eliminar la editorial']);
            }
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents("php://input"), true);
        /* ACTUALIZAR/EDITAR USUARIO DESDE INTERFAZ ADMINISTRADOR */
        if ($request === 'updateUser') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorUsuario::actualizarUsuario($input);
            echo json_encode($resultado);
        }

        /* ACTUALIZAR LIBROS DESDE EL ADMIN PANEL */ elseif ($request === 'updateBook') {
            // Obtener los datos enviados en el cuerpo de la solicitud
            $data = json_decode(file_get_contents("php://input"), true);

            // Validar que los datos necesarios estén presentes
            if (
                !isset($data['isbn']) || !isset($data['titulo']) || !isset($data['anio']) ||
                !isset($data['autor_dni']) || !isset($data['editorial_id']) ||
                !isset($data['genero']) || !isset($data['stock']) || !isset($data['portada'])
            ) {
                echo json_encode(['status' => 'error', 'message' => 'Faltan datos para actualizar el libro.']);
                exit;
            }

            // Llamar a la función del controlador para actualizar el libro
            require_once 'controlador_libro.php';
            $resultado = ControladorLibro::actualizarLibro($data);

            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Libro actualizado correctamente.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se pudo actualizar el libro.']);
            }
            exit;
        }

        /* ACTUALIZAR AUTORES DESDE ADMIN PANEL */ elseif ($request === 'updateAuthor') {
            $input = json_decode(file_get_contents("php://input"), true);
            $resultado = ControladorAutor::editarAutor($input);
            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Autor actualizado correctamente']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'No se pudo actualizar el autor']);
            }
        } /* ACTUALIZAR EDITORIALES DESDE ADMIN PANEL */ elseif ($request === 'updatePublisher') {
            $resultado = ControladorEditorial::editarEditorial($input);
            if ($resultado) {
                echo json_encode(['status' => 'success', 'message' => 'Editorial actualizada correctamente']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error al actualizar la editorial']);
            }
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
