-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS biblioteca;

-- Crear la base de datos
CREATE DATABASE biblioteca;

-- Usar la base de datos recién creada
USE biblioteca;

-- Tabla Usuario
CREATE TABLE Usuario (
    dni VARCHAR(9) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    telefono INT(9) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    contraseña VARCHAR(10) NOT NULL
);

-- Tabla Administrador (hereda atributos de Usuario)
CREATE TABLE Administrador (
    dni VARCHAR(9) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    telefono INT(9) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    contraseña VARCHAR(10) NOT NULL
);

-- Tabla Autor
CREATE TABLE Autor (
    dni VARCHAR(9) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    fecha_nacimiento DATE NOT NULL
);

-- Tabla Editorial
CREATE TABLE Editorial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    telefono INT(9) NOT NULL,
    direccion VARCHAR(255),
    fecha_nacimiento DATE NOT NULL
);

-- Tabla Libro
CREATE TABLE Libro (
    isbn VARCHAR(13) PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    año DATE NOT NULL,
    autor_dni VARCHAR(9) NOT NULL,
    editorial_id INT NOT NULL,
    genero VARCHAR(20),
    stock INT NOT NULL,
    portada VARCHAR(255),
    FOREIGN KEY (autor_dni) REFERENCES Autor(dni),
    FOREIGN KEY (editorial_id) REFERENCES Editorial(id)
);

-- Tabla Libros Prestados
CREATE TABLE Libros_Prestados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(13) NOT NULL,
    dni_usuario VARCHAR(9) NOT NULL,
    fecha_prestamo DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_devolucion DATE,
    FOREIGN KEY (isbn) REFERENCES Libro(isbn),
    FOREIGN KEY (dni_usuario) REFERENCES Usuario(dni)
);

-- Insertar usuarios
INSERT INTO Usuario (dni, nombre, apellido, telefono, correo, contraseña) VALUES
('12345678A', 'Carlos', 'Martinez', 987654321, 'carlos@example.com', 'password1'),
('87654321B', 'Laura', 'Gomez', 912345678, 'laura@example.com', 'password2'),
('11223344C', 'María', 'Perez', 912345679, 'maria@example.com', 'password3'),
('22334455D', 'Pedro', 'Sánchez', 987654322, 'pedro.sanchez@example.com', 'password4'),
('33445566E', 'Sofia', 'Ramirez', 987654323, 'sofia.ramirez@example.com', 'password5'),
('44556677F', 'Carlos', 'Lopez', 987654324, 'carlos.lopez@example.com', 'password6'),
('55667788G', 'Lucia', 'Martín', 987654325, 'lucia.martin@example.com', 'password7'),
('66778899H', 'Luis', 'Hernández', 987654326, 'luis.hernandez@example.com', 'password8'),
('77889900I', 'Raquel', 'Fernández', 987654327, 'raquel.fernandez@example.com', 'password9'),
('98765432D', 'Javier', 'Herce', 912345677, 'javier@gmail.com', 'adminpass1'),
('56473829E', 'Martin', 'Jaimes', 912345676, 'martin@gmail.com', 'adminpass2');

-- Insertar administradores
INSERT INTO Administrador (dni, nombre, apellido, telefono, correo, contraseña) VALUES
('98765432D', 'Javier', 'Herce', 912345677, 'javier@gmail.com', 'adminpass1'),
('56473829E', 'Martin', 'Jaimes', 912345676, 'martin@gmail.com', 'adminpass2');

-- Insertar autores
INSERT INTO Autor (dni, nombre, apellido, fecha_nacimiento) VALUES
('34567890F', 'Isabel', 'Allende', '1942-08-02'),
('45678901G', 'Gabriel', 'García Márquez', '1927-03-06'),
('56789012H', 'J.K.', 'Rowling', '1965-07-31'),
('67890123I', 'Mario', 'Vargas Llosa', '1936-03-28'),
('78901234J', 'Carlos', 'Fuentes', '1928-11-11'),
('89012345K', 'Octavio', 'Paz', '1914-03-31'),
('90123456L', 'Pablo', 'Neruda', '1904-07-12'),
('12345678M', 'Virginia', 'Woolf', '1882-01-25'),
('23456789N', 'Albert', 'Camus', '1913-11-07');

-- Insertar editoriales
INSERT INTO Editorial (nombre, telefono, direccion, fecha_nacimiento) VALUES
('Editorial Planeta', 912345671, 'Calle Gran Vía, Madrid', '1945-05-01'),
('Editorial Anagrama', 912345672, 'Calle Balmes, Barcelona', '1969-06-15'),
('Editorial Alfaguara', 912345673, 'Calle Orense, Madrid', '1964-04-05'),
('Editorial Random House', 912345674, 'Calle Paseo de la Castellana, Madrid', '1980-04-10'),
('Editorial HarperCollins', 912345675, 'Calle de Vallehermoso, Madrid', '1990-05-20'),
('Editorial Penguin', 912345676, 'Calle de Gran Vía, Barcelona', '1948-09-01'),
('Editorial McGraw-Hill', 912345677, 'Calle Princesa, Madrid', '1917-02-22'),
('Editorial Taurus', 912345678, 'Calle de Serrano, Madrid', '1974-06-14'),
('Editorial RBA', 912345679, 'Calle de Paseo de Gracia, Barcelona', '1959-10-09'),
('Cantaro', 0, NULL, '0000-00-00'),
('Diana', 0, NULL, '0000-00-00'),
('Salamandra', 0, NULL, '0000-00-00'),
('Debolsillo', 0, NULL, '0000-00-00'),
('Colección Popular', 0, NULL, '0000-00-00'),
('Losada S.A.', 0, NULL, '0000-00-00'),
('Anagrama', 0, NULL, '0000-00-00'),
('Anaya', 0, NULL, '0000-00-00');

-- Insertar libros
INSERT INTO Libro (isbn, titulo, año, autor_dni, editorial_id, genero, stock, portada) VALUES
('9781234567891', 'Cien Años de Soledad', '1967-05-30', '45678901G', 1, 'Novela', 10, 'https://www.planetadelibros.com.mx/usuaris/libros/fotos/155/m_libros/portada_cien-anos-de-soledad-td_gabriel-garcia-marquez_201501150207.jpg'),
('9781234567892', 'Harry Potter y la Piedra Filosofal', '1997-06-26', '56789012H', 2, 'Fantasía', 8, 'https://th.bing.com/th/id/R.805803cc0091320ff3392709185e8764?rik=ZVapd%2fHqWS%2bAjg&riu=http%3a%2f%2fcdn.coordiutil.com%2fimagen-harry_potter_y_la_piedra_filosofal_libro_1-1952728-0-0-0-75.jpg&ehk=tG4asswFSO%2bhBiDYqJazlnRx9ERwaqBOmwFZJ%2b85wv8%3d&risl=&pid=ImgRaw&r=0'),
('9781234567893', 'La Casa de los Espíritus', '1982-11-12', '34567890F', 3, 'Realismo Mágico', 5, 'https://phantom-expansion.unidadeditorial.es/8f63d59e95157a09f7ab4cc1cd6d4808/crop/0x31/1677x2548/resize/1200/f/jpg/assets/multimedia/imagenes/2022/07/21/16583909817374.jpg'),
('9782345678901', 'La Muerte de Artemio Cruz', '1962-02-20', '78901234J', 5, 'Realismo', 9, 'https://th.bing.com/th/id/OIP.UGGYVHaXq-EIM7mICVCFswHaLs?rs=1&pid=ImgDetMain'),
('9782345678902', 'El Laberinto de la Soledad', '1950-03-15', '89012345K', 6, 'Ensayo', 6, 'https://imagenes.elpais.com/resizer/gZ3Ju4WrFwPSPLWeQJzAGHhWsLg=/414x0/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/GNOOKNSNKFFSTF3WNHNE2ID3HQ.jpg'),
('9782345678903', 'Veinte Poemas de Amor y Una Canción Desesperada', '1924-01-01', '90123456L', 7, 'Poesía', 7, 'https://www.elsotano.com/imagenes_grandes/978968/978968160/978968160072.GIF');

-- Insertar libros prestados
INSERT INTO Libros_Prestados (isbn, dni_usuario, fecha_prestamo, fecha_devolucion) VALUES
('9781234567891', '12345678A', '2023-01-10', '2023-02-10'),
('9781234567892', '87654321B', '2023-02-15', '2023-03-15'),
('9781234567893', '11223344C', '2023-03-01', '2023-04-01'),
('9782345678901', '22334455D', '2023-04-05', NULL), -- aún no devuelto
('9782345678902', '33445566E', '2023-05-20', '2023-06-20'),
('9782345678903', '44556677F', '2023-06-25', NULL), -- aún no devuelto
('9781234567891', '55667788G', '2023-07-10', '2023-08-10'),
('9781234567892', '66778899H', '2023-08-12', NULL), -- aún no devuelto
('9782345678903', '77889900I', '2023-09-14', '2023-10-14'),
('9782345678902', '98765432D', '2023-10-20', NULL);
