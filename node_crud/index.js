const express = require('express');
const app = express();
const bodyParser = require('body-parser');
 const Category = require('./models/Category');
const Product = require('./models/Product')



app.set('view engine', 'vash');
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
// Get all categories
app.get('/categories', async function (req, res) {
 try {
  const data = await Category.find()
  //res.send(data)
  res.render('categories', { categories: data })
 }catch(err) {
  res,send(err)
 } 
});

// Create a new category
app.post('/categories', function (req, res) {
  const category = new Category({ name: req.body.name });
  category.save()
    .then(() => {
      res.redirect('/categories');
   
    })
    .catch((err) => {
      res.status(500).send('Error creating category');
    });
});

// Get all products
app.get('/products', function (req, res) {
  const perPage = 10;
  const page = Math.max(0, req.query.page);

  Product.find({})
    .skip(perPage * page)
    .limit(perPage)
    .populate('categoryId')
    .exec(function (err, products) {
      if (err) return res.status(500).send('Error retrieving products');
      Product.count().exec(function (err, count) {
        res.render('products', {
          products: products,
          page: page,
          pages: count / perPage,
        });
      });
    });
});

// Create a new product
app.post('/products', function (req, res) {
  const product = new Product({
    name: req.body.name,
    categoryId: req.body.categoryId,
});
product.save()
.then(() => {
 // res.redirect('/products');
  res.send({
    message: "created"
  })
})
.catch((err) => {
  res.status(500).send(err);
});
});



app.listen(8080, () => console.log("running on 8080"))