const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class FileService {
  saveFile(file) {
    try {
      // Define the target directory
      const targetDir = path.join(__dirname, "../../../uploads/orders");
  
      // Check if the directory exists, if not, create it
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
  
      // Generate the file path
      const fileName = `${Date.now()}_${file.originalname}`;
      const filePath = path.join(targetDir, fileName);
  
      // Save the file
      fs.writeFileSync(filePath, file.buffer);
      return fileName;
    } catch (error) {
      throw new Error(`Error saving file ${error.message}`);
    }
  }

deleteFile(fileName) {
  try {
    const filePath = path.join(__dirname, "../../../uploads/orders", fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    throw new Error(error.message)
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
