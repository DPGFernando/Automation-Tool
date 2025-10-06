import axios from "axios";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import searchGuideModel from "../models/guides.model.js";

export const getGuideText = async (req, res) => {
  try {
    const categoryId = req.params.categoryid;
    const guide = await searchGuideModel.findOne({  _cat_id: categoryId });

    if (!guide) {
      return res.status(404).json({ error: "Guide not found for this category" });
    }

    console.log("Guide URL from DB:", guide.guide_url);

    const response = await axios.get(guide.guide_url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);
    const data = await pdfParse(buffer);

    console.log("Guide text extracted successfully", data);

    res.json({
      title: guide.title,
      guideText: data.text   
    });
  } catch (err) {
    console.error("Guide fetch error:", err.message);
    res.status(500).json({ error: "Failed to process guide PDF" });
  }
};
