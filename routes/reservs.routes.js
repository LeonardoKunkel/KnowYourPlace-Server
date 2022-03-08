const router = require('express').Router()

const reservCtrl = require('../controllers/reservs.controller');

router.post('/create', reservCtrl.create);

module.exports = router;
