const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (_req, _res, _next) => {
    Product.fetchAll((products) => {
        _res.render('shop/product-list', { prods: products, pageTitle: 'Shop', path: '/products' });
    });

};

exports.getProduct = (_req, _res, _next) => {
    const prodId = _req.params.productId;
    Product.findById(prodId, product => {
        _res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' });
    })
};

exports.getIndex = (_req, _res, _next) => {
    Product.fetchAll((products) => {
        _res.render('shop/index', { prods: products, pageTitle: 'Shop', path: '/' });
    });
}

exports.getCart = (_req, _res, _next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            _res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });

        });
    });
}

exports.postCart = (_req, _res, _next) => {
    const prodId = _req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    _res.redirect('/cart');
}

exports.postCartDeleteProduct = (_req, _res, _next) => {
    const prodId = _req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        _res.redirect('/cart');
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