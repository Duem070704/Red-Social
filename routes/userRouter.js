const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/postUser', userController.postUser);
router.get('/getUser', userController.getUser);
router.get('/getIdUser/:id', userController.getIdUser);
router.put('/putUser/:id', userController.putUser );
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;