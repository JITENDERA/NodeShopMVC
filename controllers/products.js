const Product = require('../models/product');

exports.getAddProduct = (_req, _res, _next) => {
    _res.render('add-product', { pageTitle: 'Add Product', path: "/admin/add-product", formsCSS: true, productCSS: true, activeAddProduct: true });
};

exports.postAddProduct = (_req, _res, _next) => {
    const product = new Product(_req.body.title);
    product.save();
    _res.redirect('/');
};

exports.getProducts = (_req, _res, _next) => {
    Product.fetchAll((products) => {
        _res.render('shop', { prods: products, pageTitle: 'Shop', path: '/', hasProducts: products.length > 0, activeShop: true, productCSS: true });
    });

};