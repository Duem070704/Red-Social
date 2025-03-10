const Post = require('../models/postModel');

// Crear una publicación 
const createPost = async (req, res) => {
    try {
        // Crear una nueva instancia de la publicación con los datos del cuerpo de la solicitud
        const postCreado = new Post(req.body);
        
        // Guardar la publicación en la base de datos
        const postGuardada = await postCreado.save();

        // Enviar la respuesta con el post creado
        res.status(201).json({
            postGuardada
        });
    } catch (error) {
        res.status(400).json({
            error: "Error al crear publicación" 
        });
    }
};

// Obtener todas las publicaciones con autores
const getPost = async (req, res) => {
    try {
        // Buscar todas las publicaciones y hacer populate para obtener los nombres de los autores y los comentarios
        const posts = await Post.find()
            .populate('user', 'nombreUsuario')  // Obtener solo el nombre del autor de la publicación
            .populate('comentarios.userComment', 'nombreUsuario');  // Obtener solo el nombre del usuario que comentó

        // Devolver las publicaciones encontradas
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
const getIdPost = async (req, res) => {
    try {
        // Buscar una publicación específica por su ID
        const post = await Post.findById(req.params.id);

        // Si no se encuentra la publicación, devolver error
        if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });

        res.json(post);
    } catch (err) {

        res.status(500).json({ error: "Error al buscar Publicación"});
    }
};

// Actualizar una publicación por ID
const putPost = async (req, res) => {
    try {
        // Buscar y actualizar la publicación por ID, y devolver la nueva versión
        const postActualizado = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Si no se encuentra la publicación, responder con un error 404
        if (!postActualizado) {
            return res.status(404).json({ error: "Publicación no encontrada" });
        }

        res.status(200).json(postActualizado);
    } catch (error) {

        res.status(500).json({ error: "Error al Actualizar Publicación" });
    }
};

// Eliminar una publicación por ID
const deletePost = async (req, res) => {
    try {
        // Buscar y eliminar la publicación por ID
        const postEliminado = await Post.findByIdAndDelete(req.params.id);


        if (!postEliminado) 
            return res.status(404).json({
                error: "Publicación no encontrada" 
            });

        res.status(201).json({ message: "Publicación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al Eliminar Publicación"});
    }
};

module.exports = {
    createPost,
    getPost,
    getIdPost,
    putPost,
    deletePost
};
