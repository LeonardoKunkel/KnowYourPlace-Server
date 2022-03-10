const router = require('express').Router()

const reservCtrl = require('../controllers/reservs.controller');

router.post('/create', reservCtrl.create);

router.get('/', reservCtrl.getAll);

router.put('/edit/:id', reservCtrl.edit);

router.delete('/:id', reservCtrl.delete);

module.exports = router;
