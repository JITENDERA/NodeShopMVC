const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (_req, _res, _next) => {
  _res.render('add-product', { pageTitle: 'Add Product', path: "/admin/add-product", formsCSS: true, productCSS: true, activeAddProduct: true });
});

router.post('/product', (_req, _res, _next) => {
  products.push({ title: _req.body.title });
  _res.redirect('/');
});

exports.routes = router;
exports.products = products;



