<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca DGG</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
 
    <style>
        /* Agrandar el logo */
        .navbar-brand {
            font-size: 1.8rem;
            font-weight: bold;
        }

        /* Agrandar el menú */
        .navbar-nav .nav-link {
            font-size: 1.2rem;
            margin-left: 15px; /* Espacio entre los elementos del menú */
        }

        /* Agrandar el texto de Iniciar Sesión */
        .iniciar p {
            font-size: 1.2rem;
        }

        /* Agrandar el ícono de Iniciar Sesión */
        .bi-person-circle {
            font-size: 2rem;
        }

        .padding-titulo {
         padding: 3em; /* Ajusta el valor según sea necesario */
             }
    </style>
</head>

<body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="padding:2em;">
        <div class="container-fluid">
    <!-- Logo -->
            <a class="navbar-brand" href="#">Biblioteca DGG</a>

    <!-- Menú centrado -->
            <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="index.php">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Libros
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Libros para Prestar</a></li>
                            <li><a class="dropdown-item" href="#">Libros para Comprar</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="contacto.php">Contacto</a>
                    </li>
                </ul>
            </div>

    <!-- Iniciar sesión al final -->
            <div class="d-flex align-items-center">
                <p class="mb-0 me-2"><a href="login.php" style="text-decoration: none; color: black;">Iniciar Sesión</a></p>
                <i class="bi bi-person-circle" style="font-size: 1.5rem;"></i>
            </div>
        </div>
    </nav>

    <!-- Apartado Titulo -->

        <div class="titulo d-flex justify-content-center border border-primary" style="padding: 10em; background: #5095CA;">
            <h1 style="color: white;">Bienvenidos a la Biblioteca DGG</h1>
        </div>



        <div class="container mt-5 mb-5" style="background:#F8F9FA; padding: 4em; border-radius:2em;">
    <div class="row d-flex flex-row align-items-center">
        <!-- Imagen -->
        <div class="col-md-4 imagen">
            <img src="../Fotos/HabitosAtomicos.png" alt="Cien Años de Soledad" class="img-fluid">
        </div>
        <!-- Texto -->
        <div class="col-md-8 texto">
            <h1 class="text-center text-warning">Hábitos Atómicos</h1>
            <h2>Sipnosis</h2>
            <div class="textoParrafo mt-4">
            <p class="fs-5 text">
                    "Hábitos Atómicos" de James Clear es una guía práctica para desarrollar buenos hábitos y eliminar los malos, usando pequeños cambios diarios que, con el tiempo, producen grandes resultados. Clear explica que los hábitos son como "átomos" en nuestra vida: pequeños, pero fundamentales para nuestro crecimiento. El libro combina la ciencia de los hábitos con estrategias fáciles de seguir, ayudando a los lectores a crear sistemas efectivos para alcanzar sus metas, en lugar de depender únicamente de la fuerza de voluntad o motivación.
                    Clear desglosa el proceso de construcción de hábitos en cuatro pasos: señal, deseo, respuesta y recompensa. Estos pasos forman un ciclo que, al repetirse, fortalece los hábitos. A través de ejemplos y estudios de caso, el autor ilustra cómo un enfoque constante y acumulativo puede transformar aspectos significativos de la vida. Además, sugiere tácticas como el apilamiento de hábitos y la regla de las dos minutos para facilitar la adopción de nuevos hábitos sin esfuerzo abrumador.
                    En resumen, Hábitos Atómicos es una guía accesible para quienes desean hacer cambios duraderos mediante el poder de los hábitos.
            </p>
            </div>
        </div>

    </div>
</div>

</body>

<footer>

<div class="titulo d-flex flex-row justify-content-around border border-primary text-white" style="padding: 10em; background: #5095CA;">
    <div class="d-flex flex-column">
        <div class="div">
            <h4 class="text-warning">Biblioteca DGG</h4>

            <div class="cajasPequeñas d-flex flex-row">
                <i class="bi bi-pin-fill text-warning"></i>
                <p>Carr. de Guadarrama, 85, 28260 Galapagar, Madrid</p>
            </div>

            <div class="cajasPequeñas d-flex flex-row">
                <i class="bi bi-pin-fill text-warning"></i>
                <p>Carr. de Guadarrama, 85, 28260 Galapagar, Madrid</p>
            </div>

            <div class="cajasPequeñas d-flex flex-row">
                <i class="bi bi-telephone-fill text-warning"></i>
                <p>Carr. de Guadarrama, 85, 28260 Galapagar, Madrid</p>
            </div>
        </div>
    </div>

    <div class="d-flex flex-column">
        <div class="div">
            <h4 class="text-warning">Biblioteca DGG</h4>

            <div class="cajasPequeñas d-flex flex-row">
                <i class="bi bi-pin-fill text-warning"></i>
                <p>Carr. de Guadarrama, 85, 28260 Galapagar, Madrid</p>
            </div>

            <div class="cajasPequeñas d-flex flex-row">
                <i class="bi bi-pin-fill text-warning"></i>
                <p>Carr. de Guadarrama, 85, 28260 Galapagar, Madrid</p>
            </div>

            <div class="cajasPequeñas d-flex flex-row">
                <i class="bi bi-telephone-fill text-warning"></i>
                <p>Carr. de Guadarrama, 85, 28260 Galapagar, Madrid</p>
            </div>
        </div>
    </div>
</div>
</footer>

</html>
