require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//requerimos la rutas
const userRoutes = require('./routes/userRouter');
const postRoutes = require('./routes/postRouter');
const comentsRouter = require('./routes/commentsRouter')


const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { 
}).then(() => console.log("Conectado a MongoDB con Mongoose🚀"))
.catch(err => console.error("Error al conectar a MongoDB ❌", err));


const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=> console.log(`Servidor corriendo en http://localhost:${PORT}`));

app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', comentsRouter);