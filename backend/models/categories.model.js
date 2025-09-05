import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  _catname: {
    type: String,  
    required: true
  }
});

export default mongoose.model("Category", categorySchema);
