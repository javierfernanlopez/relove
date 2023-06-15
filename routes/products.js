var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();

/* GET users listing. */

router.get('/oneProduct/:product_id', productsController.viewProduct);

/* GET delete product. */
// localhost:3000/sellers/oneSeller/:seller_id
router.get('/delProductLogic/:seller_id/:product_id', productsController.deleteProduct);

/* GET edit product*/
// localhost:3000/products/editProduct/:product_id
router.get("/editProduct/:product_id", productsController.showEditProduct)

/* POST edit product*/
// localhost:3000/products/editProduct/:product_id
router.post("/editProduct/:seller_id/:product_id", productsController.editProduct)

module.exports = router;
