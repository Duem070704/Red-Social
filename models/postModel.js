    const {Schema, model} = require('mongoose');


    const comentsSchema = new Schema( {
        userComment: {
            type: Schema.Types.ObjectId, 
            ref:'User', index: true
        },//usamos el referencing
        texto:{
            type: String, 
            required: true,  
        },
        tiempoCreacion: { 
            type: Date,
            default: Date.now
        }
    },{
        versionKey: false,
        timestamps: true
    });
    
    const postSchema = new Schema({

        user: {
            type: Schema.Types.ObjectId, 
            ref:'User', index: true
        },//usamos el referencing

        contenido: {
            type: String,
            required: true
        },
            //comentarios de la publicacion
            comentarios:{
                type: [comentsSchema],
                default: []
            } //usamos embedding para almacenar los comentarios dentro de las publicaciones
    });


    const Post = model('Post', postSchema);
    module.exports = Post;

