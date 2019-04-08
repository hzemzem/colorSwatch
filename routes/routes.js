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

    app.get("/modifiers/:id", function (req, res) {

        var productId = req.params.id;

        api.get("products/"+productId+"/modifiers").then(function(res) {

            return res.data;
            
        }).catch((err) => {
            console.log(err)
        });

    });

};

module.exports = appRouter;