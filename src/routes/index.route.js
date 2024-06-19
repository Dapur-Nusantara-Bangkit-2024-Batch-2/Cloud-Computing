const userRouter = require("./auth.route.js");
const express = require("express");
const { getDetailFood } = require("../controller/food.controller.js");
const protectRoute = require("../middleware/protect.js");

const router = express.Router();

router.use("/user", userRouter);

router.get("/detail-food", getDetailFood);

router.get("/detail-food-protected", protectRoute, getDetailFood);

module.exports = router;
