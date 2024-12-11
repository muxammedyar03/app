const ClubService = require("../Service/ClubService");

class ClubController {
  async create(req, res) {
    try {
      const club = await ClubService.create(req.body, req.file);
      res.status(201).json(club);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const clubs = await ClubService.getAll();
      res.status(200).json(clubs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const club = await ClubService.getById(req.params.id);
      res.status(200).json(club);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
    async getMany(req, res) {
    try {
        const clubs = await ClubService.getMany(req.query);
        return res.status(200).json(clubs);
    } catch (error) {
        console.error("Error getting clubs:", error.message);
        return res.status(500).json({ error: "Error getting clubs: " + error.message });
    }
}
  async update(req, res) {
    try {
      const updatedClub = await ClubService.update(req.params.id, req.body, req.file);
      res.status(200).json(updatedClub);
    } catch (error) {
      res.status(400).json({messaga: "error with controller", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deletedClub = await ClubService.delete(req.params.id);
      res.status(200).json(deletedClub);
    } catch (error) {
      res.status(400).json({ message: "error with controller", error: error.message });
    }
  }
  async deleteMany(req, res) {
    try {
        await ClubService.deleteMany(req.query);
        return res.status(200).json({ message: "Clubs deleted successfully" });
    } catch (error) {
        console.error("Error deleting clubs:", error.message);
        return res.status(500).json({ error: "Error deleting clubs: " + error.message });
    }
}
  async deleteAll(req, res) {
    try {
        await ClubService.deleteAll();
        return res.status(200).json({ message: "All clubs deleted successfully" });
    } catch (error) {
        console.error("Error deleting all clubs:", error.message);
        return res.status(500).json({ error: "Error deleting all clubs: " + error.message });
    }
}
}

module.exports = new ClubController();
