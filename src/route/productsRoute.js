const express = require("express")
const router = express.Router()
const productsController =  require("./../controller/productsController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/products", productsController.get_products)
router.get("/products/:id", requireAuth,  productsController.get_productById);

module.exports = router;