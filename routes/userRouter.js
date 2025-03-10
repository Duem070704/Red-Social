const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/userController'); 

// Ruta para crear un nuevo usuario
router.post('/postUser', userController.postUser);

// Ruta para obtener todos los usuarios registrados
router.get('/getUser', userController.getUser);

// Ruta para obtener un usuario específico por su ID
router.get('/getIdUser/:id', userController.getIdUser);

// Ruta para actualizar un usuario existente por su ID
router.put('/putUser/:id', userController.putUser);

// Ruta para eliminar un usuario por su ID
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router; // Exportamos el router para ser utilizado en la aplicación principal
