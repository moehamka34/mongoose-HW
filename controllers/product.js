// Dependencies
const express = require('express');
const Product = require('./models/products');
const router = express.Router();
const productsSeed = require('./models/productsSeed.js');
// Buy BUTTON
// router.put('/id', (req, res) =>{
//     res.render(${product.qty}  )
// });

// router.put('/'(req, res) =>{
//     res.send(`${req.params.n} <a href=' ${req.params.qty-1}'> )
// })

// app.get('/ , (req, res) => {
//     res.send(`$(req.params.) $(req.params.)
// })
// ////////////////////////////
// Index
router.get('/product', (req, res) => {
    Product.find({}, (error, allProducts) => {
      res.render('index.ejs', {
        product: allProducts
      });
    });
  });
  // New
  router.get('/product/new', (req, res) => {
    res.render('new.ejs');
  });
  // DELETE
  router.delete('/product/:id', (req, res) => {
      Product.findByIdAndRemove(req.params.id, (err, data) => {
          res.redirect('/product')
      })
  })
  // UPDATE
  router.put('/product/:id', (req, res) => {
      Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
              new: true,
          },
          (error, updatedProduct) => {
              res.redirect(`/product/${req.params.id}`)
          }
      )
  })
  // CREATE
  router.post('/product', (req, res) => {
    console.log(req.body);
  
    Product.create(req.body, (error, createdBook) => {
      res.redirect('/product');
    });
  });
  // EDIT
  router.get('/product/:id/edit', (req, res) => {
      Product.findById(req.params.id, (error, foundProduct) => {
          res.render('edit.ejs', {
              product:  foundProduct,
          })
      })
  })
  // Show
  router.get('/product/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
      res.render('show.ejs', {
        product: foundProduct,
      });
    });
  });
  