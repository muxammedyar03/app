const Category = require('../models/CategoryModel');
const { FileService } = require('./FileService');

class CategoryService {
    async create(data, file) {
        try {
            const existingCategory = await Category.findOne({ name: data.name });
            if (existingCategory) {
                throw new Error("Category with this name already exists.");
            }
            
            const image = file ? FileService.saveFile(file) : null;

            const category = new Category({...data, image});
            return await category.save();
        } catch (error) {
            throw new Error("Error with category Create service function: " + error.message);
        }
    }


    async update(id, data, file) {
        const category = await Category.findById(id);
        if (!category) throw new Error("Category not found");

        if (file) {
            FileService.deleteFile(category.image);
            console.log("File Deleted successfully and updated successfully");
            category.image = FileService.saveFile(file);
        }
        Object.assign(category, data);
        return await category.save();
    }
    async getAll(){
        try {
            return await Category.find({});
        } catch (error) {
            throw new Error("Error while getting all categories in category service" + error.message);
        }   
    }
    async getOne(id) {
        try {
            return await Category.findById(id); 
        } catch (error) {
            throw new Error("Error with category getOne service function: " + error.message);
        }
    }

    async getMany(filter = {}) {
        try {
            const ids = filter._id.split(',');

            const categories = await Category.find({ _id: { $in: ids } });
            return categories
        } catch (error) {
            throw new Error("Error with category getMany service function: " + error.message);
        }
    }

    async deleteOne(id) {
        try {
            const category = await Category.findByIdAndDelete(id);
            if (category && category.image) {
                FileService.deleteFile(category.image);
            }
            return category;
        } catch (error) {
            throw new Error("Error with category deleteOne service function: " + error.message);
        }
    }

    async deleteMany(filter = {}) {
        try {
            const ids = filter._id.split(',');
            const categories = await Category.find({ _id: { $in: ids } });
            categories.forEach((category) => {
                if (category.image) FileService.deleteFile(category.image);
            });
            return await Category.deleteMany({ _id: { $in: ids } });
        } catch (error) {
            throw new Error("Error with category deleteMany service function: " + error.message);
        }
    }

    async deleteAll() {
        try {
            const categories = await Category.find();
            categories.forEach((category) => {
                if (category.image) FileService.deleteFile(category.image);
            });
            return await Category.deleteMany({});
        } catch (error) {
            throw new Error("Error with category service: " + error.message);
        }
    }
}

module.exports = new CategoryService();
