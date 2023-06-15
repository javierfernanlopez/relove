var express = require('express');
const sellersController = require('../controllers/sellersController');
var router = express.Router();
const multer = require("../middleware/multer")

/* GET sellers listing. */
// localhost:3000/sellers
router.get('/', sellersController.viewSellers);

/* GET seller registration */
// localhost:3000/sellers/signInSeller
router.get('/signInSeller', sellersController.viewFormSeller);

/* POST seller registration */
// localhost:3000/sellers/signInSeller
router.post('/signInSeller', multer("sellers"), sellersController.signInSeller);

/* GET one seller. */
// localhost:3000/sellers/oneSeller/:seller_id
router.get('/oneSeller/:seller_id', sellersController.viewOneSeller);

/* POST creation product */
// localhost:3000/sellers/oneSeller/:seller_id
router.post('/oneSeller/createProduct/:seller_id', multer("products"), sellersController.createProduct);



module.exports = router;
