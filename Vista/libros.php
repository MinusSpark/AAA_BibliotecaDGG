<?php
// Aquí llamamos al controlador para obtener la lista de libros
require_once("../Controlador/controladorLibros.php");
$libros = obtenerLibros();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Libros - Biblioteca DGG</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1>Listado de Libros Disponibles</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Editorial</th>
                    <th>Género</th>
                    <th>Stock</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($libros as $libro): ?>
                <tr>
                    <td><?= $libro['titulo']; ?></td>
                    <td><?= $libro['autor']; ?></td>
                    <td><?= $libro['editorial']; ?></td>
                    <td><?= $libro['genero']; ?></td>
                    <td><?= $libro['stock']; ?></td>
                    <td>
                        <a href="detalle_libro.php?isbn=<?= $libro['isbn']; ?>" class="btn btn-info">Ver Detalle</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
