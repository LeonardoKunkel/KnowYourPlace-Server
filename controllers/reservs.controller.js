const Reserv = require('../models/reservModel');
const User = require('../models/userModel')

exports.create = async (req, res) => {

    const { floor, time, user } = req.body;
    const { id } = req.params;

    try {

        const newReserv = await Reserv.create({
            floor,
            time,
            user
        });

        await User.findByIdAndUpdate(id, {
            $push: { reservations: newReserv }
        })

        res.status(201).json({
            msg: 'Reservación realizada.',
            data: newReserv
        })

    } catch (error) {
        console.log(error);

        res.status(400).json({
            msg: 'No se generó la reservación'
        })
    }

}
