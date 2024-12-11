// services/FileService.js
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

class FileService {
    static saveFile(file) {
        const fileName = `${Date.now()}_${file.originalname}`;
        const filePath = path.join(__dirname, "../../../uploads/categories", fileName);
        fs.writeFileSync(filePath, file.buffer);
        return fileName;
    }

    static deleteFile(fileName) {
        const filePath = path.join(__dirname, "../../../uploads/categories", fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    static updateFile(oldFileName, newFile) {
        try {
            this.deleteFile(oldFileName);
            return this.saveFile(newFile);
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = {FileService, upload};
