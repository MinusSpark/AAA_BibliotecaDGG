
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
    autor_dni VARCHAR(9) NOT NULL, -- Relacionado con la tabla Autor
    editorial_id INT NOT NULL, -- Relacionado con la tabla Editorial
    genero VARCHAR(20),
    stock INT NOT NULL,
    FOREIGN KEY (autor_dni) REFERENCES Autor(dni),
    FOREIGN KEY (editorial_id) REFERENCES Editorial(id)
);

-- Tabla Libros Prestados
CREATE TABLE Libros_Prestados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    isbn VARCHAR(13) NOT NULL, -- Relacionado con la tabla Libro
    dni_usuario VARCHAR(9) NOT NULL, -- Relacionado con la tabla Usuario
    fecha_prestamo DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_devolucion DATE,
    FOREIGN KEY (isbn) REFERENCES Libro(isbn),
    FOREIGN KEY (dni_usuario) REFERENCES Usuario(dni)
);


INSERT INTO Administrador (dni, nombre, apellido, telefono, correo, contraseña) 
VALUES 
('98765432D', 'Javier', 'Herce', 912345677, 'javier@gmail.com', 'adminpass1'),
('56473829E', 'Martin', 'Jaimes', 912345676, 'martin@gmail.com', 'adminpass2');

INSERT INTO Usuario (dni, nombre, apellido, telefono, correo, contraseña) 
VALUES 
('12345678A', 'Carlos', 'Martinez', 987654321, 'carlos@example.com', 'password1'),
('87654321B', 'Laura', 'Gomez', 912345678, 'laura@example.com', 'password2'),
('11223344C', 'María', 'Perez', 912345679, 'maria@example.com', 'password3');



INSERT INTO Autor (dni, nombre, apellido, fecha_nacimiento) 
VALUES 
('34567890F', 'Isabel', 'Allende', '1942-08-02'),
('45678901G', 'Gabriel', 'García Márquez', '1927-03-06'),
('56789012H', 'J.K.', 'Rowling', '1965-07-31');

INSERT INTO Editorial (nombre, telefono, direccion, fecha_nacimiento) 
VALUES 
('Editorial Planeta', 912345671, 'Calle Gran Vía, Madrid', '1945-05-01'),
('Editorial Anagrama', 912345672, 'Calle Balmes, Barcelona', '1969-06-15'),
('Editorial Alfaguara', 912345673, 'Calle Orense, Madrid', '1964-04-05');

INSERT INTO Libro (isbn, titulo, año, autor_dni, editorial_id, genero, stock) 
VALUES 
('9781234567891', 'Cien Años de Soledad', '1967-05-30', '45678901G', 1, 'Novela', 10),
('9781234567892', 'Harry Potter y la Piedra Filosofal', '1997-06-26', '56789012H', 2, 'Fantasía', 8),
('9781234567893', 'La Casa de los Espíritus', '1982-11-12', '34567890F', 3, 'Realismo Mágico', 5);

INSERT INTO Libros_Prestados (isbn, dni_usuario, fecha_prestamo, fecha_devolucion) 
VALUES 
('9781234567891', '12345678A', '2024-10-01', NULL), 
('9781234567892', '87654321B', '2024-09-28', '2024-10-05'), 
('9781234567893', '11223344C', '2024-09-30', NULL);

-- Insertar Usuarios
INSERT INTO Usuario (dni, nombre, apellido, telefono, correo, contraseña) 
VALUES 
('22334455D', 'Pedro', 'Sánchez', 987654322, 'pedro.sanchez@example.com', 'password4'),
('33445566E', 'Sofia', 'Ramirez', 987654323, 'sofia.ramirez@example.com', 'password5'),
('44556677F', 'Carlos', 'Lopez', 987654324, 'carlos.lopez@example.com', 'password6'),
('55667788G', 'Lucia', 'Martín', 987654325, 'lucia.martin@example.com', 'password7'),
('66778899H', 'Luis', 'Hernández', 987654326, 'luis.hernandez@example.com', 'password8'),
('77889900I', 'Raquel', 'Fernández', 987654327, 'raquel.fernandez@example.com', 'password9');

-- Insertar Autores
INSERT INTO Autor (dni, nombre, apellido, fecha_nacimiento) 
VALUES 
('67890123I', 'Mario', 'Vargas Llosa', '1936-03-28'),
('78901234J', 'Carlos', 'Fuentes', '1928-11-11'),
('89012345K', 'Octavio', 'Paz', '1914-03-31'),
('90123456L', 'Pablo', 'Neruda', '1904-07-12'),
('12345678M', 'Virginia', 'Woolf', '1882-01-25'),
('23456789N', 'Albert', 'Camus', '1913-11-07');

-- Insertar Editoriales
INSERT INTO Editorial (nombre, telefono, direccion, fecha_nacimiento) 
VALUES 
('Editorial Random House', 912345674, 'Calle Paseo de la Castellana, Madrid', '1980-04-10'),
('Editorial HarperCollins', 912345675, 'Calle de Vallehermoso, Madrid', '1990-05-20'),
('Editorial Penguin', 912345676, 'Calle de Gran Vía, Barcelona', '1948-09-01'),
('Editorial McGraw-Hill', 912345677, 'Calle Princesa, Madrid', '1917-02-22'),
('Editorial Taurus', 912345678, 'Calle de Serrano, Madrid', '1974-06-14'),
('Editorial RBA', 912345679, 'Calle de Paseo de Gracia, Barcelona', '1959-10-09');

-- Insertar Libros
INSERT INTO Libro (isbn, titulo, año, autor_dni, editorial_id, genero, stock) 
VALUES 
('9780123456789', 'La Fiesta Ajena', '1979-03-05', '67890123I', 4, 'Novela', 7),
('9782345678901', 'La Muerte de Artemio Cruz', '1962-02-20', '78901234J', 5, 'Realismo', 9),
('9783456789012', 'El Laberinto de la Soledad', '1950-10-17', '89012345K', 6, 'Ensayo', 6),
('9784567890123', 'Los Detectives Salvajes', '1998-07-01', '34567890F', 1, 'Novela', 5),
('9785678901234', 'El Aleph', '1949-05-01', '67890123I', 2, 'Ficción', 3),
('9786789012345', 'En El Camino', '1957-11-18', '56789012H', 3, 'Literatura Americana', 4),
('9787890123456', 'Fahrenheit 451', '1953-10-19', '23456789N', 4, 'Ciencia Ficción', 12),
('9788901234567', 'Cuentos Completos', '1952-03-10', '12345678M', 5, 'Cuentos', 10),
('9789012345678', 'La Casa de Bernarda Alba', '1936-03-02', '78901234J', 6, 'Teatro', 8),
('9789123456789', 'La Casa de Papel', '2017-11-03', '34567890F', 4, 'Drama', 7);

-- Insertar Libros Prestados
INSERT INTO Libros_Prestados (isbn, dni_usuario, fecha_prestamo, fecha_devolucion) 
VALUES 
('9781234567891', '22334455D', '2024-10-05', '2024-10-10'),
('9781234567892', '33445566E', '2024-10-06', '2024-10-12'),
('9781234567893', '44556677F', '2024-10-07', NULL),
('9784567890123', '55667788G', '2024-10-08', NULL),
('9785678901234', '66778899H', '2024-10-09', NULL),
('9786789012345', '77889900I', '2024-10-10', '2024-10-13'),
('9787890123456', '22334455D', '2024-10-11', '2024-10-14'),
('9788901234567', '33445566E', '2024-10-12', NULL),
('9789012345678', '44556677F', '2024-10-13', '2024-10-15'),
('9789123456789', '55667788G', '2024-10-14', NULL);

-- Insertar Libros Prestados con fechas de devolución NULL (prestados pero no devueltos aún)
INSERT INTO Libros_Prestados (isbn, dni_usuario, fecha_prestamo, fecha_devolucion) 
VALUES 
('9781234567891', '66778899H', '2024-10-15', NULL),
('9782345678901', '77889900I', '2024-10-16', NULL),
('9783456789012', '22334455D', '2024-10-17', NULL),
('9784567890123', '33445566E', '2024-10-18', NULL),
('9785678901234', '44556677F', '2024-10-19', NULL),
('9786789012345', '55667788G', '2024-10-20', NULL),
('9787890123456', '66778899H', '2024-10-21', NULL),
('9788901234567', '77889900I', '2024-10-22', NULL),
('9789012345678', '22334455D', '2024-10-23', NULL),
('9789123456789', '33445566E', '2024-10-24', NULL);
