const Post = require('../models/postModel');

// Crear una publicación 
const createPost = async (req, res) => {
    try {
        const postCreado = new Post(req.body);
        const postGuardada = await postCreado.save();
        res.status(201).json({
            postGuardada
        });
    } catch (error) {
        res.status(400).json({
            error: "Error al crear publicacion" 
        });
    }
};

// Obtener todas las publicaciones con autores
const getPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'nombreUsuario')  // Obtener solo el nombre del autor de la publicación
            .populate('comentarios.userComment', 'nombreUsuario');  // Obtener solo el nombre del usuario que comentó

        res.status(200).json({
            posts
        });
    } catch (error) {
        res.status(500).json({
            error: "Error al Obtener Publicación"
        });
    }
};



// Obtener una publicación por ID
const  getIdPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar una publicación por ID
const putPost = async (req, res) => {
    try {
        // Actualizar la publicación
        const postActualizado = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Si no se encuentra el post, respondemos con un error 404
        if (!postActualizado) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }

        // Respondemos con la publicación actualizada
        res.status(200).json(postActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al Actualizar Producto" });
    }
};


// Eliminar una publicación por ID
const deletePost = async (req, res) => {
    try {
        const postEliminado = await Post.findByIdAndDelete(req.params.id);
        if (!postEliminado) 
            return res.status(404).json({
         error: "Publicación no encontrada" 
        });
        res.status(201).json({ message: "Publicación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al Eliminar Publicacion"});
    }
};

module.exports = {
    createPost,
    getPost,
    getIdPost,
    putPost,
    deletePost
};
