// Libraties
import express from "express";

// Database modal
import { FoodModel } from "../../database/allModels";

const Router = express.Router();

/**
 * Route        /r/:_id
 * Des          GET all food based on particular restaurant
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get("/r/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const foods = await FoodModel.find({ restaurant: _id });

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route        /c/:category
 * Des          GET all food based on particular category
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get("/c/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    if (!foods)
      return res
        .status(404)
        .json({ error: `No food matched with ${category}` });

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
