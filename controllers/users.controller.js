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

        console.log(hashedPassword);

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
                    data: token
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
                    msg: 'Inicio de sesión exitoso.'
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
