const router = require('express').Router()

const auth = require('../middlewares/authorization')

const userCtrl = require('../controllers/users.controller')

router.post('/create', userCtrl.create);

router.post('/login', userCtrl.login);

router.get('/verifytoken', auth, userCtrl.verifyToken);

module.exports = router;
