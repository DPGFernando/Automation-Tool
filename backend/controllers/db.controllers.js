import trustedSiteModel from "../models/trustedSite.model.js";
import categoryModel from "../models/categories.model.js";
import specificationModel from "../models/specification.model.js";


export const viewCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving categories", error });
    }
};

export const getSpecifications = async (req, res) => {
    try {
        const categoryId = req.params.categoryid;
        const specifications = await specificationModel.findOne({ _cat_id: categoryId });
        res.status(200).json(specifications);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving specifications", error });
    }
}

export const getTrustedSites = async (req, res) => {
    try {
        const categoryId = req.params.categoryid;
        const trustedSites = await trustedSiteModel.findOne({ _cat_id: categoryId });
        res.status(200).json(trustedSites);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving specifications", error });
    }
}

