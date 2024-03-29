const router = require('express').Router()

const auth = require('../middlewares/authorization')

const userCtrl = require('../controllers/users.controller')

router.get('/verifytoken', auth, userCtrl.verifyToken);

router.get('/', userCtrl.getUsers);

router.get('/:id', userCtrl.getUser);

router.post('/create', userCtrl.create);

router.post('/login', userCtrl.login);

router.put('/edit/:id', userCtrl.editUser);

router.delete('/:id', userCtrl.deleteUser);


module.exports = router;
