const connection = require('../config/db');


class IndexController {

//1.- muestra la vista home
   viewHome = (req, res) => {
        let sql = "SELECT * FROM product WHERE product_deleted = 0";
        connection.query(sql, (err, result) =>{
          if(err) throw err;
          res.render('index', {result})
        })
      }
    
//2.- muestra la vista about
   viewAbout = (req, res) => {
        res.render('about');
      }

//3.- muestra los productos por categorías
    viewCategory = (req, res) => {
      let category = req.params.category;
      let sql = `SELECT * FROM product WHERE product_deleted = 0 AND category = '${category}'`;
      connection.query(sql, (err, result) => {
        if(err) throw err;
        res.render('category', {result})
      })
    }
}
module.exports = new IndexController();