import mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

//helper model to do auto-index as sql
const counterSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true
	},
	seq: {
		type: Number,
		default: 0
	}
});
// Add a static "increment" method to the Model
// It will recieve the collection name for which to increment and return the counter value
counterSchema.static("increment", async function (counterName) {
	const count = await this.findByIdAndUpdate(
		counterName,
		{ $inc: { seq: 1 } },
		// new: return the new value
		// upsert: create document if it doesn't exist
		{ new: true, upsert: true }
	);
	return count.seq;
});
const CounterModel = mongoose.model("Counter", counterSchema);

const cheeseSchema = new Schema(
	{
		id: {
			type: Number,
			required: true,
			default: 0
		},
		title: {
			type: String,
			uppercase: true,
			required: true
		},
		price: {
			type: Number
		},
		description: {
			type: String
		},
		category: {
			type: String
		},
		image: {
			type: String
		}
	},
	{ timestamps: true }
);

cheeseSchema.pre("save", async function () {
	// Don't increment if this is NOT a newly created document
	if (!this.isNew) return;
	// @ts-ignore
	const testvalue = await CounterModel.increment("entity");
	this.testvalue = testvalue;
});

export default mongoose.model("Cheese", cheeseSchema);
