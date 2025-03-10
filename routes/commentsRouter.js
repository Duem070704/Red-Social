const express = require('express');
const router = express.Router(); // Importamos el enrutador de Express
const commentController = require('../controllers/commentController'); // Importamos el controlador de comentarios

// Ruta para crear un comentario en una publicación específica
router.post('/postComment/:id', commentController.postComment);

// Ruta para actualizar un comentario específico dentro de una publicación
router.put('/putComment/:postId/:commentId', commentController.putComment);

// Ruta para eliminar un comentario específico dentro de una publicación
router.delete('/deleteComment/:postId/:commentId', commentController.deleteComment);

module.exports = router; // Exportamos el router para ser utilizado en la aplicación principal
