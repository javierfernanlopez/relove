const connection = require('../config/db');
const bcrypt = require('bcrypt');

class SellersController {

// 1.- Muestra la vista de todos los vendedores 
    viewSellers = (req, res) => {
        let sql = "SELECT * FROM seller WHERE seller_deleted = 0";
        connection.query(sql, (err, result) =>{
          if(err) throw err;
          res.render('sellers', {result})
        })
    }

// 2.- Muestra el formulario para crear vendedor
    viewFormSeller = (req,res) => {
        res.render('formSeller')
    }

// 3.- Crea al vendedor
    signInSeller = (req,res) => {
        let{seller_name, seller_last_name, email, password, phone_number, seller_description} = req.body;

        if(seller_name === "" || seller_last_name === "" || email === "" || password === "" || phone_number === ""){
            res.render('formSeller', {message: "All required fields must be filled in."})
        }else{
            let img = "";
            if(req.file != undefined){
                img = req.file.filename
            } else {
                img = "default-seller.png";
            }

            if(seller_description === ""){
                seller_description = "This seller has no description";
            }
            bcrypt.hash(password, 10, (err, hash) => {
                if(err) throw err;

                let sql = `INSERT INTO seller (seller_name, seller_last_name, email, password, phone_number, seller_description, seller_img) VALUES ("${seller_name}", "${seller_last_name}", "${email}", "${hash}", "${phone_number}", "${seller_description}", "${img}")`;

                connection.query(sql, (err, result) => {
                    if(err){
                        if(err.errno === 1062) {
                            res.render("formSeller", {message: "This email is already registered."})
                        }
                    } else{
                        res.redirect("/sellers")
                    }
                })
            })
        }


    }

// 4.- Muestra la página de un vendedor con todos sus productos
    viewOneSeller = (req,res) => {
        let id = req.params.seller_id;
        let sqlSeller =`SELECT * FROM seller WHERE seller.seller_id = ${id} AND seller_deleted = 0`;
        let sqlProduct =`SELECT * FROM product WHERE product.seller_id = ${id} AND product_deleted = 0`;
        
        connection.query(sqlSeller, (err, resultSeller) => {
            if(err) throw err;
            connection.query(sqlProduct, (err, resultProduct) => {
                if(err) throw err;
                res.render('oneSeller', {resultSeller, resultProduct})
            })
        })
    }

// 5.- Crea un producto
    createProduct = (req,res) => {
        let seller_id = req.params.seller_id;
        let{product_name, category, product_description, product_status, price} = req.body;
        

        if(product_name === "" || category === "" || product_status === "" || price === "" || price === 0){
            let id = req.params.seller_id;
            let sqlSeller =`SELECT * FROM seller WHERE seller.seller_id = ${id} AND seller_deleted = 0`;
            let sqlProduct =`SELECT * FROM product WHERE product.seller_id = ${id} AND product_deleted = 0`;
                connection.query(sqlSeller, (err, resultSeller) => {
                    if(err) throw err;
                    connection.query(sqlProduct, (err, resultProduct) => {
                        if(err) throw err;
                        res.render('oneSeller', {resultSeller, resultProduct, message: "Missing fields to be filled in."})
                    })
                })
            

        } else{
            let img = "";
            if(req.file != undefined){
                img = req.file.filename;
            } else {
                img = "default-product.png";
            }

            if(product_description == ""){
                product_description = "This product has no description.";
            }

            let sql = `INSERT INTO product (product_name, category, product_description, product_status, product_img, price, seller_id) VALUES ("${product_name}", "${category}", "${product_description}", "${product_status}", "${img}", ${price}, ${seller_id})`;

            connection.query(sql, (err, result) => {
                if(err) throw err;
                res.redirect(`/sellers/oneSeller/${seller_id}`)
            })
        }
    }


}

module.exports = new SellersController();