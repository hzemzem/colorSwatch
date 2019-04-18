var Connection = require('../connection');

//Initialize new API Connection:
var api = new Connection({
    hash: 'mf2ue9h',
    token: '9umvbiq17vyvmzmczut20uchxc4bqfk',
    cid: 'q2cj8xpan1phkt5yz8fi5qwmakspic8',
    host: 'https://api.bigcommerce.com' //The BigCommerce API Host
});

var appRouter = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get("/", function (req, res) {
        res.status(200).send({
            message: 'Welcome to the API'
        });
    });

    var highestInventory = 0;
    var highestInventoryImage = '';

    app.get("/:id", function (req, res) {
        // console.log(req.params.id);
        var productId = req.params.id;
        api.get('products/' + productId + '/variants').then(function (productVariants) {

            // console.log(productVariants.data.length);

            for (var i = 0; i < productVariants.data.length; i++) {
                if (productVariants.data[i].inventory_level > highestInventory) {
                    highestInventory = productVariants.data[i].inventory_level;
                    highestInventoryImage = productVariants.data[i].image_url;
                }
            }

            if (productVariants.data.length > 1) {
                var productData = {
                    highestImageUrl: highestInventoryImage,
                    productVariants
                }
            } else {
                var productData = {
                    highestImageUrl: '',
                    productVariants
                }
            }
            

            res.status(200).json(productData);

            highestInventory = 0;
            highestInventoryImage = '';

        }).catch((err) => {
            console.log(err)
        });
    });

};

module.exports = appRouter;