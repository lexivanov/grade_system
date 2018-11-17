const productController = require('./controllers/product_controller.js');
const countryController = require('./controllers/country_controller.js');
const cityController = require('./controllers/city_controller.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = 3000;

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", 
    "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
app.use(bodyParser.json());

router.route('/products')
    .get(productController.getAll)
    .post(productController.add);

router.route('/products/:id')
    .get(productController.getBy)
    .put(productController.edit)
    .delete(productController.remove);

router.route('/countries')
    .get(countryController.getAll);

router.route('/cities')
    .get(cityController.getAll);

app.use('/api', router);
app.listen(port);