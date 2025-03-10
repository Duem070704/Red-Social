const User = require('../models/userModel');

//Crear usuario

const postUser =  async (req, res) => {
    try {
        const userCreado = new User(req.body);
        const userGuardada = await userCreado.save();
        res.status(201).json({
            userGuardada
        });
    } catch (error) {
        res.status(400).json({
            error: "Error al crear Usuario" 
        });
    }
};


//Obtener todos los usuarios (GET)
const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Obtener un usuario por ID (GET)
const getIdUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Actualizar un usuario por ID (PUT)
const putUser =  async (req, res) => {
    try {
        const { nombreUsuario, gmail } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { nombreUsuario, gmail },
            { new: true, runValidators: true } // Retorna el usuario actualizado y valida los datos
        );
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.status(200).json({message:"Usuario Actualizado Correctamente"});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Eliminar un usuario por ID (DELETE)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    postUser,
    getUser,
    getIdUser,
    putUser,
    deleteUser
};
