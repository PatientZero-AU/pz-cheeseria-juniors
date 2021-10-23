import mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const orderSchema = new Schema(
	{
		items: { type: Array, default: [] },
		totalPrice: { type: String }
	},
	{ timestamps: true }
);

export default mongoose.model("Order", orderSchema);
