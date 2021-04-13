const express = require('express');
const bodyParser = require('body-parser');
const Utils = require('./utils/utils')
const app = express();
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors')
// mysql://b5e448b4688021:68e0cd3d@us-cdbr-east-02.cleardb.com/heroku_2d72029db592459?reconnect=true

const PORT = process.env.PORT || 4006
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods',  'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,   Content-Type, X-Codingpedia, Authorization');
    next();
   });
   
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post('/post', Utils.verifyToken, (req, res) => {
    Utils.createPost(req, res);
})

router.get('/post', Utils.verifyToken, (req, res) => {
    Utils.findPost(req, res)
})

router.post('/login', (req, res) => {

    Utils.findLogin(req, res)
})

router.post('/create', (req, res) => {
    Utils.createLogin(req, res)
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);


app.listen(PORT, () => console.log('Start port 4006')).timeout = 120000;