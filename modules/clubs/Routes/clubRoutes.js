const express = require('express');
const upload = require('../middlewares/multer');
const ClubController = require('../Contrroller/ClubController');
const router = express.Router();

router.post('/', upload.single('image'), ClubController.create);
router.get('/many', ClubController.getMany); // Get Many
router.get('/', ClubController.getAll); // Get All
router.get('/:id', ClubController.getById); // Get One
router.put('/:id', upload.single('image'), ClubController.update); // Update
router.delete('/one/:id', ClubController.delete); // Delete One
router.delete('/many', ClubController.deleteMany); // Delete Many
router.delete('/all', ClubController.deleteAll); // Delete All
module.exports = router;
