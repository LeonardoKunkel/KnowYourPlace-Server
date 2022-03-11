const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {

    const {
        name,
        lastname,
        email,
        password,
        profile,
        field,
        position,
        reservations
    } = req.body

    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // console.log(hashedPassword);

        const newUser = await User.create({
            name,
            lastname,
            email,
            password: hashedPassword,
            profile,
            field,
            position,
            reservations
        });

        console.log(newUser);

        // JWT
        const payload = {
            user: {
                id: newUser._id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                if (error) {
                    throw error
                }
                res.status(201).json({
                    msg: 'Usuario creado con éxito.',
                    data: token,
                    // newUser
                })
            }
        )

    } catch (error) {
        console.log(error);

        res.status(400).json({
            msg: 'Hubo un error al crear el usuario o la contraseña.'
        })
    }

}

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const foundUser = await User.findOne({ email });

        if(!foundUser) {
            return res.status(400).json({
                msg: 'El usuario no fue encontrado.'
            })
        }

        const verifiedPass = await bcrypt.compare(password, foundUser.password);

        if(!verifiedPass) {
            return await res.status(400).json({
                msg: 'El usuario o la contraseña no coinciden.'
            })
        }

        // JWT
        const payload = {
            user: {
                id:foundUser._id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 360000
            },
            (error, token) => {
                if(error) throw error

                res.status(202).json({
                    msg: 'Inicio de sesión exitoso.',
                    data: token
                });
            }
        )

    } catch (error) {
        console.log(error);

        res.status(401).json({
            msg: 'Hubo un problema con la autenticación.'
        })
    }

}

exports.getUsers = async (req, res) => {

    try {

        const usersFound = await User.find({}).populate('reservations');

        res.status(200).json({
            msg: 'Usuarios encontrados.',
            data: usersFound
        })

    } catch (error) {
        console.log(error);

        res.status(404).json({
            msg: 'Usurios no encontrados.'
        })
    }

}

exports.getUser = async (req, res) => {

    const { id } = req.params;

    try {

        const userFound = await User.findById(id).populate('reservations');

        res.status(200).json({
            msg: 'Usuario encontrado.',
            data: userFound
        })

    } catch (error) {
        console.log(error);

        res.status(404).json({
            msg: 'Usuario no encontrado.'
        })
    }

}

exports.editUser = async (req, res) => {

    const { id } = req.params;
    const {
        name,
        lastname,
        field,
        position,
        profile
    } = req.body

    try {

        const userUpdated = await User.findByIdAndUpdate(
            id,
            { name, lastname, field, position, profile },
            { new: true }
        )

        res.status(202).json({
            msg: 'Usuario actualizado',
            data: userUpdated
        });

    } catch (error) {
        console.log(error);

        res.status(400).json({
            msg: 'Hubo un problema actualizando al usuario.'
        })
    }

}

exports.deleteUser = async (req, res) => {

    const { id } = req.params;

    try {

        const userDeleted = await User.findByIdAndDelete(id);

        res.status(202).json({
            msg: 'Usuario elimienado con éxito',
            data: userDeleted
        })

    } catch (error) {
        console.log(error);

        res.status(400).json({
            msg: 'No se puedo eliminar al usuario'
        })
    }

}

exports.verifyToken = async (req, res) => {

    console.log(req.user);

    try {

        const foundUser = await User.findById(req.user.id).select("-password")

        res.status(202).json({
            msg: 'Datos del usuario encontrados.',
            data: foundUser
        })

    } catch (error) {
        console.log(error);

        res.status(401).json({
            msg: 'No está autorizado.'
        })
    }

}
