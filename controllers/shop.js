const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (_req, res) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('shop/product-list', { prods: rows, pageTitle: 'Shop', path: '/products' });
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', { product: product[0], pageTitle: product.title, path: '/products' });
        })
        .catch(err => console.log(err));
};

exports.getIndex = (_req, res) => {
    Product.fetchAll()
        .then(([rows]) => {
            res.render('shop/index', { prods: rows, pageTitle: 'Shop', path: '/' });
        })
        .catch(err => console.log(err));

}

exports.getCart = (_req, res) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
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