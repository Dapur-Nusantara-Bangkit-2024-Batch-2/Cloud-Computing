const removeWhitespace = require("../utils/removeWhitespace.js");
const removeHypen = require("../utils/removeHypen.js");
const foodData = require("../data/food.data.json");

const getDetailFood = async (req, res) => {
  const { foodName } = req.params;
  const foundedFood = foodData.find((food) => removeWhitespace(food.name).toLocaleLowerCase() === removeHypen(removeWhitespace(foodName)).toLocaleLowerCase());
  if (!foundedFood) {
    return res.status(404).json({ error: true, message: "Food data item not found" });
  }
  return res.status(200).json({ error: false, data: foundedFood });
};

module.exports = { getDetailFood };
