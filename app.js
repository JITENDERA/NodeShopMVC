const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRouters = require('./routes/shop');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, _res, next) => {
    User.findById("5f8b257d0246614a0c65f99b")
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRouters);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://jitendera:Rz2NaWawVCDHcTm9@clusternode.kx2fs.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'JP',
                    email: 'jp@test.com',
                    cart: {
                        itmes: []
                    }
                });
                user.save();
            }
        })

        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
