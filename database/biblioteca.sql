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
    anio DATE NOT NULL,
    autor_dni VARCHAR(9) NOT NULL,
    editorial_id INT NOT NULL,
    genero VARCHAR(20),
    stock INT NOT NULL,
    portada VARCHAR(255),
    FOREIGN KEY (autor_dni) REFERENCES Autor(dni),
    FOREIGN KEY (editorial_id) REFERENCES Editorial(id)
);

-- cambios a la tabla libro
ALTER TABLE libro ADD COLUMN reservas INT DEFAULT 0;

-- Tabla Libros Prestados
CREATE TABLE libros_prestados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_dni VARCHAR(10) NOT NULL,
    libro_isbn VARCHAR(13) NOT NULL,
    fecha_prestamo DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion DATETIME DEFAULT NULL,
    FOREIGN KEY (usuario_dni) REFERENCES usuario(dni),
    FOREIGN KEY (libro_isbn) REFERENCES libro(isbn)
);

-- Tabla Reservas
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_dni VARCHAR(10) NOT NULL,
    libro_isbn VARCHAR(13) NOT NULL,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_dni) REFERENCES usuario(dni),
    FOREIGN KEY (libro_isbn) REFERENCES libro(isbn)
);

-- Tabla Donaciones
CREATE TABLE donaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    monto DECIMAL(10, 2),
    mensaje VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de eventos
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    descripcion VARCHAR(255) NOT NULL
);

ALTER TABLE eventos ADD COLUMN max_asistentes INT NOT NULL DEFAULT 0;
ALTER TABLE eventos ADD COLUMN asistentes_actuales INT NOT NULL DEFAULT 0;

-- Tabla de inscripciones
CREATE TABLE inscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT NOT NULL,
    usuario_dni VARCHAR(9) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    FOREIGN KEY (evento_id) REFERENCES eventos(id),
    FOREIGN KEY (usuario_dni) REFERENCES Usuario(dni)
);

-- Tabla lista de espera
CREATE TABLE lista_espera (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_dni VARCHAR(10) NOT NULL,
    libro_isbn VARCHAR(13) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_dni) REFERENCES usuario(dni),
    FOREIGN KEY (libro_isbn) REFERENCES libro(isbn)
);

CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_dni VARCHAR(9) NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_dni) REFERENCES Usuario(dni)
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
('77889900I', 'Raquel', 'Fernández', 987654327, 'raquel.fernandez@example.com', 'password9');

-- Insertar administradores
INSERT INTO Administrador (dni, nombre, apellido, telefono, correo, contraseña) VALUES
('98765432D', 'Javier', 'Herce', 912345677, 'javier@gmail.com', 'adminpass1'),
('56473829E', 'Martin', 'Jaimes', 912345676, 'martin@gmail.com', 'adminpass2');

-- Insertar autores
INSERT INTO Autor (dni, nombre, apellido, fecha_nacimiento) VALUES
('44332211A', 'Gabriel', 'García Márquez', '1927-03-06'),
('55443322B', 'Isabel', 'Allende', '1942-08-02'),
('66554433C', 'Julio', 'Cortázar', '1914-08-26'),
('77665544D', 'Mario', 'Vargas Llosa', '1936-03-28'),
('88776655E', 'J.K.', 'Rowling', '1965-07-31'),
('99887766F', 'George', 'Orwell', '1903-06-25'),
('10998877G', 'Jane', 'Austen', '1775-12-16'),
('21009988H', 'Mark', 'Twain', '1835-11-30'),
('32111099I', 'Fyodor', 'Dostoevsky', '1821-11-11'),
('43222110J', 'Ernest', 'Hemingway', '1899-07-21'),
('54321012A', 'Hermann', 'Hesse', '1877-07-02'),
('65432103B', 'Virginia', 'Woolf', '1882-01-25'),
('76543214C', 'Franz', 'Kafka', '1883-07-03'),
('87654325D', 'Albert', 'Camus', '1913-11-07'),
('98765436E', 'Leo', 'Tolstoy', '1828-09-09'),
('19876547F', 'Charles', 'Dickens', '1812-02-07'),
('29765458G', 'William', 'Faulkner', '1897-09-25'),
('39654369H', 'Homer', '', '-0800-01-01'),
('49543270I', 'Dante', 'Alighieri', '1265-05-01'),
('59432181J', 'Miguel', 'de Cervantes', '1547-09-29');

-- Insertar editoriales
INSERT INTO Editorial (nombre, telefono, direccion, fecha_nacimiento) VALUES
('Penguin Random House', 123456789, 'Calle Falsa 123, Ciudad Ficticia', '1935-07-01'),
('HarperCollins', 987654321, 'Avenida Real 456, Ciudad Imaginaria', '1817-01-01'),
('Simon & Schuster', 112233445, 'Boulevard Literario 789, Ciudad de los Libros', '1924-01-02'),
('Hachette Livre', 998877665, 'Plaza de la Cultura 101, Ciudad del Saber', '1826-01-04'),
('Macmillan Publishers', 556677889, 'Pasaje de los Escritores 202, Ciudad Literaria', '1843-11-10'),
('Oxford University Press', 223344556, 'Oxford, Reino Unido', '1586-01-01'),
('Scholastic Corporation', 334455667, '557 Broadway, Nueva York, NY', '1920-10-22'),
('Random House', 445566778, 'New York, USA', '1927-01-01'),
('Pan Macmillan', 556677889, '20 New Wharf Road, Londres, UK', '1843-11-10'),
('Bloomsbury Publishing', 667788990, '50 Bedford Square, Londres, UK', '1986-01-01'),
('Vintage Books', 998877665, '1745 Broadway, New York, NY', '1954-01-01'),
('Faber & Faber', 887766554, 'Bloomsbury House, Londres, UK', '1929-01-01'),
('Little, Brown and Company', 776655443, '1290 Avenue of the Americas, New York, NY', '1837-01-01'),
('Círculo de Lectores', 665544332, 'Calle de la Paz 123, Barcelona, España', '1962-01-01'),
('Editorial Planeta', 554433221, 'Avenida Diagonal 662, Barcelona, España', '1949-01-01'),
('Editorial Alfaguara', 443322110, 'Calle de los Artistas 45, Madrid, España', '1964-01-01'),
('Editorial Anagrama', 332211009, 'Calle dels Àngels, Barcelona, España', '1969-01-01'),
('Editorial Eterna Cadencia', 221100998, 'Honduras 5574, Buenos Aires, Argentina', '2005-01-01'),
('Editorial Acantilado', 110099887, 'Calle Mallorca 219, Barcelona, España', '1999-01-01'),
('Taschen', 101122334, 'Hohenzollernring 53, Colonia, Alemania', '1980-01-01');

-- Insertar libros
INSERT INTO Libro (isbn, titulo, anio, autor_dni, editorial_id, genero, stock, portada) VALUES
('9780141182533', 'Cien años de soledad', '1967-06-05', '44332211A', 1, 'Realismo mágico', 10, 'https://m.media-amazon.com/images/I/91TvVQS7loL.jpg'),
('9780060883287', 'La casa de los espíritus', '1982-10-30', '55443322B', 2, 'Realismo mágico', 8, 'https://m.media-amazon.com/images/I/816xOSfb2XL._UF1000,1000_QL80_.jpg'),
('9780307475466', 'Rayuela', '1963-06-28', '66554433C', 3, 'Novela', 5, 'https://m.media-amazon.com/images/I/913qsYmTdmL._AC_UF894,1000_QL80_.jpg'),
('9780241968581', 'La fiesta del chivo', '2000-05-05', '77665544D', 1, 'Histórica', 7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwwN_gR7eX1oUk-VSftJTkHwgHbr6i6dRbkA&s'),
('9781408855652', 'Harry Potter y la piedra filosofal', '1997-06-26', '88776655E', 5, 'Fantasía', 15, 'https://images.cdn1.buscalibre.com/fit-in/360x360/fe/58/fe581c3ec5f295989816825413d462a4.jpg'),
('9780451524935', '1984', '1949-06-08', '99887766F', 1, 'Distopía', 12, 'https://m.media-amazon.com/images/I/71sOSrd+JxL._AC_UF894,1000_QL80_.jpg'),
('9780141439518', 'Orgullo y prejuicio', '1813-01-28', '10998877G', 6, 'Romance', 9, 'https://m.media-amazon.com/images/I/61wAZk6G8mL._AC_UF894,1000_QL80_.jpg'),
('9780199536559', 'Las aventuras de Huckleberry Finn', '1884-12-10', '21009988H', 6, 'Aventura', 6, 'https://www.editorialjuventud.es/wp-content/uploads/4105-2.jpg'),
('9780140449136', 'Crimen y castigo', '1866-01-01', '32111099I', 7, 'Clásico', 4, 'https://m.media-amazon.com/images/I/713hTReVysL._AC_UF894,1000_QL80_.jpg'),
('9780684801223', 'El viejo y el mar', '1952-09-01', '43222110J', 8, 'Aventura', 11, 'https://m.media-amazon.com/images/I/71TDhHidulL._AC_UF894,1000_QL80_.jpg'),
('9780140449266', 'Siddhartha', '1922-01-01', '54321012A', 11, 'Filosófica', 8, 'https://m.media-amazon.com/images/I/91Bi7C1ML0L.jpg'),
('9780156907392', 'La señora Dalloway', '1925-05-14', '65432103B', 12, 'Clásico', 5, 'https://www.akal.com/media/akal/images/cover-35047.jpg'),
('9780805209990', 'La metamorfosis', '1915-10-25', '76543214C', 13, 'Filosófica', 10, 'https://www.udllibros.com/imagenes/9788496/978849681502.JPG'),
('9780679731187', 'El extranjero', '1942-01-01', '87654325D', 14, 'Existencialismo', 6, 'https://m.media-amazon.com/images/I/61RLAWzw+rL._AC_UF894,1000_QL80_.jpg'),
('9780140449198', 'Anna Karenina', '1877-01-01', '98765436E', 15, 'Romance', 7, 'https://m.media-amazon.com/images/I/71wLs1YK8yL._AC_UF894,1000_QL80_.jpg'),
('9780141439563', 'Grandes esperanzas', '1861-01-01', '19876547F', 16, 'Clásico', 9, 'https://www.planetadelibros.com/usuaris/libros/thumbs/5f30697a-269b-43f8-9289-350e65aa4809/d_1200_1200/portada_grandes-esperanzas_charles-dickens_201505260951.webp'),
('9780679732177', 'El sonido y la furia', '1929-01-01', '29765458G', 17, 'Modernismo', 4, 'https://m.media-amazon.com/images/I/71wxHir7RSL._UF1000,1000_QL80_.jpg'),
('9780140449280', 'La Ilíada', '0800-01-01', '39654369H', 18, 'Épica', 10, 'https://editorialverbum.es/wp-content/uploads/2020/07/La-Iliada.jpg'),
('9780199535644', 'La Divina Comedia', '1320-01-01', '49543270I', 19, 'Épica', 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwDN80KLHRWVEd5ljcgV9T8zGtXV43ER4f2w&s'),
('9780060934347', 'Don Quijote de la Mancha', '1605-01-16', '59432181J', 20, 'Aventura', 8, 'https://m.media-amazon.com/images/I/91CIwR3QU1L._UF1000,1000_QL80_.jpg');

-- Insertar préstamos en la tabla libros_prestados
INSERT INTO libros_prestados (usuario_dni, libro_isbn, fecha_prestamo, fecha_devolucion) VALUES
-- Préstamos dentro del plazo
('12345678A', '9780141182533', '2024-11-01 10:00:00', '2024-11-25 10:00:00'),
('87654321B', '9780060883287', '2024-11-10 14:30:00', '2024-11-28 14:30:00'),
('11223344C', '9780307475466', '2024-11-15 09:00:00', '2024-11-30 09:00:00'),
('22334455D', '9780241968581', '2024-11-20 12:00:00', '2024-12-02 12:00:00'),
('33445566E', '9781408855652', '2024-11-23 16:45:00', '2024-12-01 16:45:00'),
-- Préstamo fuera del plazo
('44556677F', '9780451524935', '2024-10-20 11:00:00', NULL);
