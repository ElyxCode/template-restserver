const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = model("Category", CategorySchema);
