require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const express = require('express');  // Importar Express.js para crear el servidor
const mongoose = require('mongoose');  // Importar Mongoose para manejar la conexión a MongoDB
// Requerimos las rutas de los controladores para usuarios, publicaciones y comentarios
const userRoutes = require('./routes/userRouter');
const postRoutes = require('./routes/postRouter');
const comentsRouter = require('./routes/commentsRouter');

const app = express();  // Crear la aplicación Express
app.use(express.json());  // Middleware para parsear las solicitudes con cuerpos JSON

// Conexión a MongoDB usando Mongoose
mongoose.connect(process.env.MONGO_URI, { 
}).then(() => {
    console.log("Conectado a MongoDB con Mongoose🚀");  // Si la conexión es exitosa
}).catch(err => {
    console.error("Error al conectar a MongoDB ❌", err);  // Si hay un error en la conexión
});

// Definir el puerto del servidor
const PORT = process.env.PORT || 3002;  // Usar el puerto de la variable de entorno o 3002 como predeterminado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);  // Iniciar el servidor en el puerto definido
});

// Usar las rutas para las diferentes funcionalidades de la API
app.use('/api', userRoutes);  // Rutas para usuarios
app.use('/api', postRoutes);  // Rutas para publicaciones
app.use('/api', comentsRouter);  // Rutas para comentarios
