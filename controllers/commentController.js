const User = require('../models/userModel');
const Post = require('../models/postModel');

// Agregar un comentario a una publicación
const postComment = async (req, res) => {
    try {
        const { texto, usuario } = req.body;

        // Buscar la publicación por ID
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Publicación no encontrada' });

        // Verificar si el usuario existe y obtener solo su nombre
        const user = await User.findById(usuario);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        // Agregar el comentario embebido en la publicación con solo el ID del usuario
        post.comentarios.push({
            userComment: user._id,  // Almacenamos el ID del usuario
            texto,
        });

        await post.save();

        // Devolver la publicación con los comentarios actualizados y hacer populate
        const populatedPost = await Post.findById(post._id).populate('comentarios.userComment', 'nombre');  // Usamos populate para obtener el nombre del usuario

        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




// Actualizar una publicación por ID
const putComment = async (req, res) => {
    try {
        const { texto } = req.body;
        const { postId, commentId } = req.params; // Asegúrate de que pasas postId y commentId

        // Buscar la publicación por ID
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Publicación no encontrada" });

        // Buscar el comentario por ID y actualizarlo
        const comment = post.comentarios.id(commentId);
        if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });

        comment.texto = texto; // Actualizar solo el texto del comentario
        await post.save();

        res.status(200).json({message: "Comentario Actualizado Correctamente"}); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Eliminar una publicación por ID
const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params; // Obtener postId y commentId de los parámetros

        // Buscar la publicación por ID
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Publicación no encontrada" });

        // Buscar y eliminar el comentario por ID
        const comment = post.comentarios.id(commentId);
        if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });

        // Usar pull para eliminar el comentario del array
        post.comentarios.pull(commentId);  // Aquí se utiliza pull() para eliminar el comentario

        await post.save();

        res.status(200).json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





module.exports = {
    postComment,
    putComment,
    deleteComment
};
