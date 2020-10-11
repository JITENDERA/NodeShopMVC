const Product = require('../models/product');

exports.getAddedProduct = (_req, _res, _next) => {
    _res.render('admin/add-product', { pageTitle: 'Add Product', path: "/admin/add-product", formsCSS: true, productCSS: true, activeAddProduct: true });
};

exports.postAddProduct = (_req, _res, _next) => {
    const title = _req.body.title;
    const imageUrl = _req.body.imageUrl;
    const price = _req.body.price;
    const description = _req.body.description;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    _res.redirect('/');
};

exports.getProduct = (_req, _res, _next) => {
    Product.fetchAll((products) => {
        _res.render('admin/products', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' });
    });
};