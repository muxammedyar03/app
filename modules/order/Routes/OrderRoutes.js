const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const upload = require('../middlewares/multer')

router.post('/', upload, OrderController.create);
router.get('/one/:id', OrderController.getOne);
router.get('/', OrderController.getAll);
router.get('/many', OrderController.getMany);
router.put('/:id', upload, OrderController.update);
router.delete('/one/:id', OrderController.delete);
router.delete('/all', OrderController.deleteAll);

module.exports = router;
