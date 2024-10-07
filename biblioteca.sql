
CREATE DATABASE biblioteca;

-- Tabla Usuario
CREATE TABLE Usuario (
    dni VARCHAR(9) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    telefono INT(9) NOT NULL,
    correo VARCHAR(20) NOT NULL,
    contraseña VARCHAR(10) NOT NULL
);

-- Tabla Administrador (hereda atributos de Usuario)
CREATE TABLE Administrador (
    dni VARCHAR(9) PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    telefono INT(9) NOT NULL,
    correo VARCHAR(20) NOT NULL,
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
    nombre VARCHAR(20) NOT NULL UNIQUE,
    telefono INT(9) NOT NULL,
    direccion VARCHAR(255),
    fecha_nacimiento DATE NOT NULL
);

-- Tabla Libro
CREATE TABLE Libro (
    isbn VARCHAR(9) PRIMARY KEY,
    titulo VARCHAR(20) NOT NULL,
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
    isbn VARCHAR(9) NOT NULL, -- Relacionado con la tabla Libro
    dni_usuario VARCHAR(9) NOT NULL, -- Relacionado con la tabla Usuario
    fecha_prestamo DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_devolucion DATE,
    FOREIGN KEY (isbn) REFERENCES Libro(isbn),
    FOREIGN KEY (dni_usuario) REFERENCES Usuario(dni)
);


-- INSERT INTO Usuario (dni, nombre, apellido, telefono, correo, contraseña) 
-- VALUES 
-- ('12345678A', 'Carlos', 'Martinez', 987654321, 'carlos@example.com', 'password1'),
-- ('87654321B', 'Laura', 'Gomez', 912345678, 'laura@example.com', 'password2'),
-- ('11223344C', 'María', 'Perez', 912345679, 'maria@example.com', 'password3');

-- INSERT INTO Administrador (dni, nombre, apellido, telefono, correo, contraseña) 
-- VALUES 
-- ('98765432D', 'Jorge', 'Lopez', 912345677, 'jorge.admin@example.com', 'adminpass1'),
-- ('56473829E', 'Ana', 'Mendez', 912345676, 'ana.admin@example.com', 'adminpass2');

-- INSERT INTO Autor (dni, nombre, apellido, fecha_nacimiento) 
-- VALUES 
-- ('34567890F', 'Isabel', 'Allende', '1942-08-02'),
-- ('45678901G', 'Gabriel', 'García Márquez', '1927-03-06'),
-- ('56789012H', 'J.K.', 'Rowling', '1965-07-31');

-- INSERT INTO Editorial (nombre, telefono, direccion, fecha_nacimiento) 
-- VALUES 
-- ('Editorial Planeta', 912345671, 'Calle Gran Vía, Madrid', '1945-05-01'),
-- ('Editorial Anagrama', 912345672, 'Calle Balmes, Barcelona', '1969-06-15'),
-- ('Editorial Alfaguara', 912345673, 'Calle Orense, Madrid', '1964-04-05');

-- INSERT INTO Libro (isbn, titulo, año, autor_dni, editorial_id, genero, stock) 
-- VALUES 
-- ('9781234567891', 'Cien Años de Soledad', '1967-05-30', '45678901G', 1, 'Novela', 10),
-- ('9781234567892', 'Harry Potter y la Piedra Filosofal', '1997-06-26', '56789012H', 2, 'Fantasía', 8),
-- ('9781234567893', 'La Casa de los Espíritus', '1982-11-12', '34567890F', 3, 'Realismo Mágico', 5);

-- INSERT INTO Libros_Prestados (isbn, dni_usuario, fecha_prestamo, fecha_devolucion) 
-- VALUES 
-- ('9781234567891', '12345678A', '2024-10-01', NULL), 
-- ('9781234567892', '87654321B', '2024-09-28', '2024-10-05'), 
-- ('9781234567893', '11223344C', '2024-09-30', NULL);
