const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            msg: 'No hay token, permiso inválido.'
        })
    }

    try {

        const openToken = await jwt.verify(token, process.env.SECRET);

        req.user = openToken.user

        next()

    } catch (error) {
        console.log(error);

        res.status(404).json({
            msg: 'Hubo un error con el token'
        })
    }

}

module.exports = auth;
