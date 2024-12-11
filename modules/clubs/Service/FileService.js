const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class FileService {
  saveFile(file) {
    const fileName = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(__dirname, "../../../uploads/clubs", fileName);
    fs.writeFileSync(filePath, file.buffer);
    return fileName;
}

 deleteFile(fileName) {
    const filePath = path.join(__dirname, "../../../uploads/clubs", fileName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

 updateFile(oldFileName, newFile) {
    try {
        this.deleteFile(oldFileName);
        return this.saveFile(newFile);
    } catch (error) {
        console.log(error.message);
    }
}
}

module.exports = new FileService();
