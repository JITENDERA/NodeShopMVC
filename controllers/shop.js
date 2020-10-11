const Product = require('../models/product');

exports.getProducts = (_req, _res, _next) => {
    Product.fetchAll((products) => {
        _res.render('shop/product-list', { prods: products, pageTitle: 'Shop', path: '/products' });
    });

};

exports.getIndex = (_req, _res, _next) => {
    Product.fetchAll((products) => {
        _res.render('shop/index', { prods: products, pageTitle: 'Shop', path: '/' });
    });
}

exports.getCart = (_req, _res, _next) => {
    _res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
}

exports.getCheckOut = (_req, _res, _next) => {
    _res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}

exports.getOrders = (_req, _res, _next) => {
    _res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}