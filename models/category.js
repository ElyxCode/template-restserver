const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
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

// change output json
CategorySchema.methods.toJSON = function () {
  const { _id, __v, status, ...category } = this.toObject();

  return { _id, ...category };
};

module.exports = model("Category", CategorySchema);
