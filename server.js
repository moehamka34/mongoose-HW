// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
// const product = require('./models/product')
const Product = require('./models/products');
const methodOverride = require('method-override');

// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// ROUTES/CONTROLLERS:
const productSeed = require('./models/productsSeed');
app.get('/product/seed', (req, res) => {
  Product.deleteMany({}, (error, allProducts) => {});
  Product.create(productSeed, (error, data) => {
    res.redirect('/product');
  });
});
// Buy BUTTON
// app.get('/', (req, res) =>{
//     res.send( <a href='/98'>  )
// });

// app.get(,(req, res) =>{
//     res.send(`${req.params.n} <a href=' ${req.params.qty-1}'> )
// })

// app.get('/:number_of_bottles' , (req, res) => {
//     res.send(`$(req.params.number_of_bottles)  <a href=` $(req.params. </a>)
// })
// ////////////////////////////
// Index
app.get('/product', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render('index.ejs', {
      product: allProducts
    });
  });
});
// New
app.get('/product/new', (req, res) => {
  res.render('new.ejs');
});
// DELETE
app.delete('/product/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/product')
    })
})
// UPDATE
app.put('/product/:id', (req, res) => {
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
app.post('/product', (req, res) => {
  console.log(req.body);

  Product.create(req.body, (error, createdBook) => {
    res.redirect('/product');
  });
});
// EDIT
app.get('/product/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product:  foundProduct,
        })
    })
})
// Show
app.get('/product/:id', (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render('show.ejs', {
      product: foundProduct,
    });
  });
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listning on port: ${PORT}`);
});