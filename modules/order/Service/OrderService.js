const OrderModel = require('../models/OrderModel');
const Order = require('../models/OrderModel');
const FileService = require('../Service/FileService');
const fs = require('fs'); // Fayl tizimi bilan ishlash uchun

class OrderService {
  async create(data, files) {
    try {
      const frontLogo = files[1] ? FileService.saveFile(files[1]) : null;
      const backLogo = files['back.logo.file'] ? FileService.saveFile(files['back.logo.file'][0]) : null;
      const clothingImage = files[0] ? FileService.saveFile(files[0]) : null;

      const order = new Order({
        ...data,
        clothing: {
          ...data.clothing,
          image: clothingImage
        },
        front: {
          ...data.front,
          logo: { 
            ...data.front.logo,
            file: frontLogo 
          },

        },
        back: {
          ...data.back,
          logo: { ...data.back?.logo, file: backLogo },
        },
      });

      return await order.save();
    } catch (error) {
      throw new Error('Error creating order in Service: ' + error.message);
    }
  }
  async getAll() {
    try {
      return await Order.find();
    } catch (error) {
      throw new Error('Error fetching orders in Service:'+ error.message);
    }
  }
  async getOne(id) {
    try {
      const order = await Order.findById(id).populate('customerId').populate('clothing.itemId');
      if (!order) throw new Error('Order not found');
      return order;
    } catch (error) {
      throw new Error('Error fetching order: ' + error.message , id);
    }
  }
  async getMany(filter = {}) {
    try {
      return await Order.find(filter).populate('customerId').populate('clothing.itemId');
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  }
async update(id, data, files) {
  try {
    const order = await Order.findById(id);
    if (!order) throw new Error('Order not found');

    // Yangi tasvirlarni saqlash va massivga qo'shish
    const clothingImages = [];
    if (files[0]) {
      const frontImage = FileService.saveFile(files[0]);
      clothingImages.push(frontImage);
      if (order.clothing?.image?.[0] && fs.existsSync(order.clothing.image[0])) {
        FileService.deleteFile(order.clothing.image[0]);
      }
    }

    if (files[1]) {
      const backImage = FileService.saveFile(files[1]);
      clothingImages.push(backImage);
      if (order.clothing?.image?.[1] && fs.existsSync(order.clothing.image[1])) {
        FileService.deleteFile(order.clothing.image[1]);
      }
    }

    // Front logo faylini saqlash
    const frontLogo = files[2]
      ? FileService.saveFile(files[2])
      : order.front?.logo?.file;
    if (files[2] && order.front?.logo?.file && fs.existsSync(order.front.logo.file)) {
      FileService.deleteFile(order.front.logo.file);
    }

    // Back logo faylini saqlash
    const backLogo = files[3]
      ? FileService.saveFile(files[3])
      : order.back?.logo?.file;
    if (files[3] && order.back?.logo?.file && fs.existsSync(order.back.logo.file)) {
      FileService.deleteFile(order.back.logo.file);
    }

    // Yangilanish ma'lumotlarini birlashtirish
    const updatedOrderData = {
      ...data,
      clothing: {
        ...order.clothing,
        image: clothingImages, // Massivni o'rnatish
      },
      front: {
        ...order.front,
        logo: {
          ...order.front?.logo,
          file: frontLogo,
        },
      },
      back: {
        ...order.back,
        logo: {
          ...order.back?.logo,
          file: backLogo,
        },
      },
    };

    // Buyurtmani yangilash va qaytarish
    const updatedOrder = await Order.findByIdAndUpdate(id, updatedOrderData, { new: true });
    return updatedOrder;
  } catch (error) {
    throw new Error('Error updating order: ' + error.message);
  }
}
  async delete(id) {
    try {
      const order = await Order.findById(id);
      if (!order) throw new Error('Order not found');

      // Logolarni o'chirish
      if (order.front.logo.file) FileService.deleteFile(order.front.logo.file);
      if (order.back.logo.file) FileService.deleteFile(order.back.logo.file);

      return await Order.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error deleting order: ' + error.message);
    }
  }
  async deleteAll() {
    try {
      const orders = await OrderModel.find();
      if (orders.length === 0) {
        throw new Error('No orders found to delete');
      }
  
      orders.forEach((order) => {
        if (Array.isArray(order.clothing?.image)) {
          order.clothing.image.forEach((imagePath) => {
            if (fs.existsSync(imagePath)) {
              FileService.deleteFile(imagePath);
            }
          });
        } else if (order.clothing?.image) { 
          if (fs.existsSync(order.clothing.image)) {
            FileService.deleteFile(order.clothing.image);
          }
        }
  
        if (order.front?.logo?.file && fs.existsSync(order.front.logo.file)) {
          FileService.deleteFile(order.front.logo.file);
        }
  
        if (order.back?.logo?.file && fs.existsSync(order.back.logo.file)) {
          FileService.deleteFile(order.back.logo.file);
        }
      });
  
      return await OrderModel.deleteMany({});
    } catch (error) {
      throw new Error('Error deleting all orders: ' + error.message);
    }
  }
}

module.exports = new OrderService();
