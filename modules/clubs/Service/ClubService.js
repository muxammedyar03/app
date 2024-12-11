const Club = require('../model/clubModel');
const FileService = require('./FileService');

class ClubService {
  async create(data, file) {
    try {
      const image = file ? FileService.saveFile(file) : null;
      const club = new Club({ 
        ...data, 
        image,
        colors: typeof data.colors === 'string' ? JSON.parse(data.colors) : data.colors,
        sizes: typeof data.sizes === 'string' ? JSON.parse(data.sizes) : data.sizes
     });
      return await club.save();
    } catch (error) {
      throw new Error("Error creating club: " + error.message);
    }
  }

  async getAll() {
    try {
      return await Club.find();
    } catch (error) {
      throw new Error("Error fetching clubs: " + error.message);
    }
  }

  async getById(id) {
    try {
      return await Club.findById(id);
    } catch (error) {
      throw new Error("Error fetching club: " + error.message);
    }
  }
  async getMany(filter) {
    const query = {};
    if (filter.colors) query.colors = { $in: JSON.parse(filter.colors) };
    if (filter.sizes) query.sizes = { $in: JSON.parse(filter.sizes) };
    return await Club.find(query);
  }
  async update(id, data, file) {
    try {
      const club = await Club.findById(id);
      if (!club) throw new Error("Club not found");
      const image = file ? FileService.saveFile(file) : club.image;
      if (file && club.image) FileService.deleteFile(club.image);

      return await Club.findByIdAndUpdate(id, { ...data, image }, { new: true });
    } catch (error) {
      throw new Error("Error updating club: " + error.message);
    }
  }

  async delete(id) {
    try {
      const club = await Club.findByIdAndDelete(id);
      if (club && club.image){
        FileService.deleteFile(club.image);
      } 
      return club;
    } catch (error) {
      throw new Error("Error deleting club: " + error.message);
    }
  }
  async deleteMany(filter) {
    const ids = filter._id.split(',');
    const clubs = await Club.find({ _id: { $in: ids } });

    clubs.forEach((club) => {
        if (club.image) FileService.deleteFile(club.image);
    });

    return await Club.deleteMany({ _id: { $in: ids } });
   }
  async deleteAll() {
      try {
        const clubs = await Club.find();
        clubs.forEach((club) => {
            if (club.image) FileService.deleteFile(club.image);
        });
        
        return await Club.deleteMany({});
      } catch (error) {
          throw new Error("error with service" + error.message)
      }
   }
}

module.exports = new ClubService();
