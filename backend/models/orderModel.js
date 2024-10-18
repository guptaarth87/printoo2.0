const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  uname:{ type: String, required: true },
  email: { type: String, required: true },
  phoneno: { type: String, required: true },
  deliveryslot: { type: String, required: true },
  typeOfOrder: { type: String, required: true },
  address: { type: String, required: true },
  branch:{ type: String, required: true },
  year: { type: String, required: true },
  price: { type: Number, required: true },
  paymentdata: { type: Object, required: true },
  black_and_white_fileurl: { type: String, default: null },
  color_fileurl: { type: String, default: null },
  delivered : { type: Boolean}
});


module.exports = mongoose.model('Order', orderSchema);
