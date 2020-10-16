const Product = require('../models/product');

exports.getAddedProduct = (_req, res) => {
    res.render('admin/edit-product', { pageTitle: 'Add Product', path: "/admin/add-product", editing: false });
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        userId: req.user.id
    })
        .then(result => {
            console.log('Created Product');
            res.redirect('/admin/products');
            //console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, _res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return _res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user
        .getProducts({ where: { id: prodId } })
        //Product.findByPk(prodId)
        .then(products => {
            const product = products[0];
            if (!product) {
                return _res.redirect('/');
            }
            _res.render('admin/edit-product', { pageTitle: 'Edit Product', path: "/admin/edit-product", editing: editMode, product: product });
        })
        .catch(err => console.log(err));

};

exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId;
    const updateTitle = req.body.title;
    const updatePrice = req.body.price;
    const updateImageUrl = req.body.imageUrl;
    const updateDesc = req.body.description;
    Product.findByPk(prodId)
        .then(product => {
            product.title = updateTitle;
            product.price = updatePrice;
            product.description = updateDesc;
            product.imageUrl = updateImageUrl;
            return product.save();
        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

};

exports.getProducts = (req, res) => {
    req.user
        .getProducts()
        //roduct.findAll()
        .then(products => {
            res.render('admin/products', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' });
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log("DESTROYED PRODUCT!");
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}