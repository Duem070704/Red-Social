const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Crear un comentario
router.post('/postComment/:id', commentController.postComment);

// Actualizar un comentario
router.put('/putComment/:postId/:commentId', commentController.putComment);

// Eliminar un comentario
router.delete('/deleteComment/:postId/:commentId', commentController.deleteComment);

module.exports = router;
