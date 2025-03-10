const { Schema, model } = require('mongoose'); 

// Definimos el esquema para los usuarios
const userSchema = new Schema({
    nombreUsuario: {
        type: String, 
        required: true, // Es obligatorio proporcionar un nombre de usuario
        unique: true // Garantiza que no haya nombres de usuario duplicados
    },

    gmail: {
        type: String, 
        required: true, // Es obligatorio proporcionar un correo
        unique: true // Garantiza que no haya correos duplicados en la base de datos
    }
}, {
    versionKey: false, // Desactiva el campo "__v" que agrega Mongoose por defecto
    timestamps: true // Agrega automáticamente los campos "createdAt" y "updatedAt"
});

// Creamos el modelo 'User' basado en el esquema userSchema
const User = model('User', userSchema);

module.exports = User; // Exportamos el modelo para poder utilizarlo en otras partes del proyecto
