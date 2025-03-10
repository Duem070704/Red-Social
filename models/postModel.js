const { Schema, model } = require('mongoose'); // Importamos Schema y model desde mongoose

// Definimos el esquema para los comentarios
const comentsSchema = new Schema({
    userComment: {
        type: Schema.Types.ObjectId,  // Referencia al usuario que hizo el comentario
        ref: 'User', // Relacionamos con el modelo 'User'
        index: true // Agregamos un índice para mejorar el rendimiento en búsquedas
    }, // Usamos referencing para enlazar el comentario con un usuario existente

    texto: {
        type: String, 
        required: true,  // El comentario es obligatorio
    },

    tiempoCreacion: { 
        type: Date,
        default: Date.now // Se asigna automáticamente la fecha de creación
    }
}, {
    versionKey: false, // Desactiva la clave de versión (__v) en los documentos
    timestamps: true // Agrega automáticamente createdAt y updatedAt
});

// Definimos el esquema para las publicaciones
const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,  // Referencia al usuario que creó la publicación
        ref: 'User', // Relacionamos con el modelo 'User'
    }, // Usamos referencing para enlazar la publicación con un usuario existente

    contenido: {
        type: String,
        required: true // La publicación debe contener texto obligatorio
    },

    // Sección de comentarios dentro de la publicación
    comentarios: {
        type: [comentsSchema], // Embebemos el esquema de comentarios dentro de la publicación
        default: [] // Inicialmente, la publicación no tiene comentarios
    } // Usamos embedding para almacenar los comentarios dentro de cada publicación
});

// Creamos el modelo 'Post' basado en el esquema postSchema
const Post = model('Post', postSchema);

module.exports = Post; // Exportamos el modelo para usarlo en otras partes del proyecto
