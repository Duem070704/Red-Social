const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/createPost', postController.createPost);
router.get('/getPost', postController.getPost);
router.get('/getIdPost/:id', postController.getIdPost);
router.put('/putPost/:id', postController.putPost);
router.delete('/deletePost/:id', postController.deletePost);

module.exports = router;