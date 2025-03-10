const User = require('../models/userModel');
const Post = require('../models/postModel');

// Agregar un comentario a una publicación
const postComment = async (req, res) => {
    try {
        const { texto, usuario } = req.body; // Extraemos el texto del comentario y el ID del usuario desde el cuerpo de la solicitud

        // Buscar la publicación por ID usando el parámetro de la ruta
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Publicación no encontrada' }); 

        // Verificar si el usuario existe usando su ID
        const user = await User.findById(usuario);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' }); 

        // Agregar el comentario embebido en la publicación, solo con el ID del usuario
        post.comentarios.push({
            userComment: user._id,  // Almacenamos el ID del usuario que hizo el comentario
            texto,
        });

        await post.save(); // Guardamos la publicación con el comentario agregado

        // Devolver la publicación con los comentarios actualizados y hacer populate para incluir el nombre del usuario
        const populatedPost = await Post.findById(post._id).populate('comentarios.userComment', 'nombre');  // Populate para incluir el nombre del usuario

        res.status(201).json(populatedPost); // Respondemos con la publicación actualizada
    } catch (error) {
        res.status(400).json({ error: "Error al Crear Comentario" }); 
    }
};

// Actualizar un comentario por ID
const putComment = async (req, res) => {
    try {
        const { texto } = req.body; // Extraemos el texto actualizado del comentario
        const { postId, commentId } = req.params; // Extraemos el postId y commentId desde los parámetros de la ruta

        // Buscar la publicación por ID
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Publicación no encontrada" }); 

        // Buscar el comentario dentro de la publicación por ID y actualizarlo
        const comment = post.comentarios.id(commentId);
        if (!comment) return res.status(404).json({ error: "Comentario no encontrado" }); 

        comment.texto = texto; // Actualizamos solo el texto del comentario
        await post.save(); // Guardamos los cambios en la publicación

        res.status(200).json({ message: "Comentario Actualizado Correctamente" }); 
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar el Comentario" }); 
    }
};

// Eliminar un comentario de una publicación por ID
const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params; // Extraemos postId y commentId desde los parámetros de la ruta

        // Buscar la publicación por ID
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Publicación no encontrada" }); 

        // Buscar el comentario dentro de la publicación por ID
        const comment = post.comentarios.id(commentId);
        if (!comment) return res.status(404).json({ error: "Comentario no encontrado" }); 

        // Usar pull para eliminar el comentario del array de comentarios
        post.comentarios.pull(commentId); // Elimina el comentario del array de comentarios

        await post.save(); // Guardamos los cambios en la publicación

        res.status(200).json({ message: "Comentario eliminado correctamente" }); 
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el Comentario" }); 
    }
};

module.exports = {
    postComment,
    putComment,
    deleteComment
};
