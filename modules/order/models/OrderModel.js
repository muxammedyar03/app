const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true},
  clothing: {
    size: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: [String], required: true },
  },
  front: {
    logo: {
      file: { type: String, default: null },
      size: { type: [String, String] },
      position: { type: [String, String] },
    },
    text: {
      content: { type: String, default: null },
      fontFamily: { type: String, default: null },
      fontSize: { type: Number, default: null },
      color: { type: String, default: null },
      size: { type: [String, String] },
      position: { type: [String, String] },
    },
  },
  back: {
    logo: {
      file: { type: String, default: null },
      size: { type: [String, String] },
      position: { type: [String, String] },
    },
    text: {
      content: { type: String, default: null },
      fontFamily: { type: String, default: null },
      fontSize: { type: Number, default: null },
      color: { type: String, default: null },
      size: {type: [String, String]},
      position: {type: [String, String]},
    },
  },
  quantity: { type: Number, required: true },
}, {timestamps: true});

module.exports = mongoose.model('Order', OrderSchema);
