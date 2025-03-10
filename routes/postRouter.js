const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Ruta para crear una nueva publicación
router.post('/createPost', postController.createPost);

// Ruta para obtener todas las publicaciones
router.get('/getPost', postController.getPost);

// Ruta para obtener una publicación específica por su ID
router.get('/getIdPost/:id', postController.getIdPost);

// Ruta para actualizar una publicación existente por su ID
router.put('/putPost/:id', postController.putPost);

// Ruta para eliminar una publicación por su ID
router.delete('/deletePost/:id', postController.deletePost);

module.exports = router; // Exportamos el router para ser utilizado en la aplicación principal
