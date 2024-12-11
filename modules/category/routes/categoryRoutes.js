const express = require("express");
const CategoryController = require("../controller/categoryController");

const router = express.Router();
const { upload } = require('../services/FileService')

// Category yo‘nalishlari
router.post("/",upload.single("image"), CategoryController.create);
router.put("/one/:id",upload.single("image"), CategoryController.update);
router.get("/all", CategoryController.getAll)
router.get("/:id", CategoryController.getOne);
router.get("/", CategoryController.getMany);
router.delete("/one/:id", CategoryController.deleteOne);
router.delete("/many", CategoryController.deleteMany);
router.delete("/all", CategoryController.deleteAll);

module.exports = router;
