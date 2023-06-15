const connection = require('../config/db');


class ProductsController {

// 1.- Muestra un producto
    viewProduct = (req,res) => {
        let id = req.params.product_id;
        let sql = `SELECT * FROM product WHERE product_id = ${id}`;
        console.log(req.params)

        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.render('oneProduct', {result})
        }) 
    }

// 2.- Borrado lógico de un producto
    deleteProduct = (req, res) => {
        let {seller_id, product_id} = req.params;

        let sql = `UPDATE product SET product_deleted = 1 WHERE product_id = ${product_id}`;
        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.redirect(`/sellers/oneSeller/${seller_id}`)
        })
    }

// 3.- Muestra el editor de un producto
    showEditProduct = (req, res) => {
        let product_id = req.params.product_id;

        let sql = `SELECT * FROM product WHERE product_id = ${product_id} AND product.product_deleted = 0`;

        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.render('editProduct', {result})
        })

    }

// 4.- Edita un producto 
    editProduct = (req,res) => {
        let {seller_id, product_id} = req.params;

        let {product_name, product_description, price} = req.body;

        let sql = `UPDATE product SET product_name= "${product_name}", product_description = "${product_description}", price = ${price} WHERE product_id = ${product_id}`;

        if(req.file != undefined) {
            let img = req.file.filename;
            sql = `UPDATE product SET product_name= "${product_name}", product_description = "${product_description}", price = ${price}, product_img = ${img} WHERE product_id = ${product_id}`;

        }

        connection.query(sql, (err, result) => {
            if(err) throw err;
            res.redirect(`/products/oneProduct/${product_id}`)
        })
    }



}

module.exports = new ProductsController();