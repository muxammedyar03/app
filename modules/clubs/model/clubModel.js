const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const ClubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    clubId: { type: String, default: uuidv4, unique: true },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    textOptions: {
      color: { type: String, default: '' },
      fontFamily: { type: String, default: '' },
      fontSize: { type: Number, default: 12 },
    },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Club', ClubSchema);
