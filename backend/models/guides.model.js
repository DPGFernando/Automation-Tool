import mongoose from "mongoose";

const searchGuideSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  _cat_id: {
    type: String,
    required: true
  },
  guide_url: {
    type: String,  
    required: true
  }
});

export default mongoose.model("Search_Guide", searchGuideSchema);
