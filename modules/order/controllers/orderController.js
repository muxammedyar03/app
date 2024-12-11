const OrderService = require('../Service/OrderService');

class OrderController {
  async create(req, res) {
    try {
      const order = await OrderService.create(req.body, req.files);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req,res) {
    try {
      const order = await OrderService.getAll();
      res.status(200).json(order);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const order = await OrderService.getOne(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getMany(req, res) {
    try {
      const orders = await OrderService.getMany(req.query);
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const order = await OrderService.update(req.params.id, req.body, req.files);
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await OrderService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async deleteAll(req, res) {
    try {
      const orders = await OrderService.deleteAll();
      res.status(204).json({ message: "All clubs deleted successfully" + orders });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting all orders: ', message: error.message });
    }
  }
}

module.exports = new OrderController();
