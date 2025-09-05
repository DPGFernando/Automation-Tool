import mongoose from "mongoose";

const trustedSiteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  _cat_id: {
    type: String,
    required: true
  },
  websites: {
    type: [String],  // ✅ Array of strings
    required: true
  }
});

export default mongoose.model("Trusted_Site", trustedSiteSchema);
