<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - Biblioteca DGG</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <h2>Iniciar Sesión</h2>
                <form action="../Controladores/controladorLogin.php" method="POST">
                    <div class="form-group mb-3">
                        <label for="correo">Correo Electrónico:</label>
                        <input type="email" name="correo" class="form-control" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="contraseña">Contraseña:</label>
                        <input type="password" name="contraseña" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
