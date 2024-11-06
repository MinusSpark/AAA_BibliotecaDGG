// node-backend/server.js

const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Permite que React acceda a la API
app.use(express.json());

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});


// Configura el transporte para enviar correos
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Endpoint para enviar notificación de disponibilidad de libro
app.post('/api/notify-availability', (req, res) => {
    const { email, bookTitle } = req.body;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: `Disponibilidad del libro ${bookTitle}`,
        text: `El libro "${bookTitle}" ya está disponible para préstamo. ¡Visita nuestra biblioteca para reservarlo!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error al enviar notificación');
        }
        res.send('Notificación enviada con éxito');
    });
});

// Endpoint para obtener libros disponibles
app.get('/api/books', (req, res) => {
    const sql = 'SELECT * FROM Libro WHERE stock > 0';
    db.query(sql, (error, results) => {
        if (error) {
            console.error('Error fetching books:', error);
            return res.status(500).send('Error al obtener libros');
        }
        res.json(results);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
