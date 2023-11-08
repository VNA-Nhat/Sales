const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: { type: String, require: true },
      amount: { type: Number, require: true },
      image: { type: String, require: true },
      price: { type: Number, require: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  shippingAddress: {
    fullname: {type: String, require: true},
    address: {type: String, require: true},
    city: {type: String, require: true},
    phone: {type: String, require: true},
  },

  PaymentMethod: {type: String, require: true},
  itemsPrice: {type: Number, require: true},
  shippingPrice: {type: Number, require: true},
  taxPrice: {type: String, require: true},
  totalPrice: {type: Number, require: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
  isPaid: {type: Boolean, default: false}, //đã thanh toán ?
  paidAt: {type: Date}, //Thanh toán vào lúc nào
  isDelivered: {type: Boolean, default: false}, //đã giao hàng?
  deliverdAt: {type: Date}, //giao vào thời điểm nào
},
  {
    timestamps:true
  }
);
const Oder = mongoose.model('Oder', orderSchema);
module.exports= Order;