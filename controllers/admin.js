const Product = require('../models/product');

exports.getAddedProduct = (_req, _res, _next) => {
    _res.render('admin/edit-product', { pageTitle: 'Add Product', path: "/admin/add-product", editing: false });
};

exports.postAddProduct = (_req, _res, _next) => {
    const title = _req.body.title;
    const imageUrl = _req.body.imageUrl;
    const price = _req.body.price;
    const description = _req.body.description;
    const product = new Product(null, title, price, imageUrl, description);
    product.save();
    _res.redirect('/');
};

exports.getEditProduct = (_req, _res, _next) => {
    const editMode = _req.query.edit;
    if (!editMode) {
        return _res.redirect('/');
    }
    const prodID = _req.params.productId;
    Product.findById(prodID, product => {
        if (!product) {
            return _res.redirect('/');
        }
        _res.render('admin/edit-product', { pageTitle: 'Edit Product', path: "/admin/edit-product", editing: editMode, product: product });
    })

};

exports.postEditProduct = (_req, _res, _next) => {
    const prodId = _req.body.productId;
    const updateTitle = _req.body.title;
    const updatePrice = _req.body.price;
    const updateImageUrl = _req.body.imageUrl;
    const updateDesc = _req.body.description;
    const updateProduct = new Product(prodId, updateTitle, updatePrice, updateImageUrl, updateDesc);
    updateProduct.save();
    _res.redirect('/admin/products');
};

exports.getProduct = (_req, _res, _next) => {
    Product.fetchAll((products) => {
        _res.render('admin/products', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' });
    });
};

exports.postDeleteProduct = (_req, _res, _next) => {
    const prodId = _req.body.productId;
    Product.deleteById(prodId);
    _res.redirect('/admin/products');
}