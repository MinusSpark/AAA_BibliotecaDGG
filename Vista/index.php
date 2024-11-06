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
    

    <!-- Apartado del carrousel -->

        <div id="carouselExampleCaptions" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="..." class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                </div>
                </div>
                <div class="carousel-item">
                <img src="..." class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the second slide.</p>
                </div>
                </div>
                <div class="carousel-item">
                <img src="..." class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the third slide.</p>
                </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>


    <!-- Apartado de las cards -->
        <div class="container-fluid">
             <div class="row d-flex justify-content-evenly">

                <div class="card" style="width: 18rem;">
                    <img src="..\Fotos\CienSoledad.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center fs-4 text">Cien Años De Soledad</h5>
                        <p class="card-text fs-5 text">Señalada como "catedral gótica del lenguaje", este clásico del siglo XX es el enorme y esplendido tapiz de la saga de la familia Buendía, en la mítica aldea de Macondo.</p>
                        <a href="CienAñosDeSoledad.php" class="btn btn-primary">Ver Más</a>
                    </div>
                </div> 

                <div class="card" style="width: 18rem;">
                    <img src="../Fotos/HabitosAtomicos.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center fs-4 text">Hábitos Atómicos</h5>
                        <p class="card-text fs-5 text">Más de 4 millones de ejemplares vendidos en todo el mundo. Un libro fascinante que cambiará el modo en que vivimos nuestro día a día.
                        «Sumamente práctico y útil.» MARK MANSON</p>
                        <a href="HábitosAtómicos.php" class="btn btn-primary">Ver Más</a>
                    </div>
                </div> 

                <div class="card" style="width: 18rem;">
                    <img src="../Fotos/QuijoteMancha.png"class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center fs-4 text">Don Quijote De La Mancha</h5>
                        <p class="card-text fs-5 text">En 2015 Don quijote de la mancha cumplió cuatrocientos años de vida. Es mucho tiempo, pero la novela de Miguel de Cervantes sigue fresca y lozana después de tantas ediciones y tantos millones de ejemplares vendidos.</p>
                        <a href="QuijoteMancha.php" class="btn btn-primary">Ver Más</a>
                    </div>
                </div> 

                <div class="card" style="width: 18rem;">
                    <img src="../Fotos/AnaFrank.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center fs-4 text">Diario De Ana Frank</h5>
                        <p class="card-text fs-5 text">Ana Frank fue una niña judía que vivió escondida de los alemanes junto con su familia durante casi dos años y medio. En ese tiempo, se dedicó a escribir un diario en el que relató sus vivencias y sentimientos.</p>
                        <a href="AnaFrank.php" class="btn btn-primary">Ver Más</a>
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
