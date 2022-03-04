const router = require('express').Router()

const userCtrl = require('../controllers/users.controller')

router.post('/create', userCtrl.create);

router.post('/login', userCtrl.login);

module.exports = router;
