<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - Biblioteca DGG</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
 

</head>

<body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    




    <div class="container mt-5">
        <div class="row justify-content-center" style="background:#F8F9FA; padding:7em;">
            <div class="col-md-4" >
                <h2 class="text-center mb-5">Iniciar Sesión</h2>

                <!-- Parte de login -->
                <form action="../Controlador/controladorLogin.php" method="POST">

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
