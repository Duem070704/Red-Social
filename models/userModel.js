const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    nombreUsuario:{
        type: String,
        required: true, 
        unique: true
    },
    gmail:{
        type: String,
        required: true,
        unique: true
    }
},{
    versionKey: false,
    timestamps: true
});

const User = model('User',userSchema);
module.exports = User;