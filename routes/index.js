var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController")

//1.- localhost:3000/
router.get('/', indexController.viewHome);

//2.- localhost:3000/about
router.get('/about', indexController.viewAbout);

// 3.- localhost:3000/category/:category
router.get('/category/:category', indexController.viewCategory);

module.exports = router;
