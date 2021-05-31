import * as express from 'express';
import * as _ from "lodash";
const fs = require('fs');
const cheeses = require('./data/cheeses.json');
const purchases = require('./data/purchases.json');

const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});

router.get('/api/purchases/:userId', (req, res) => {
    const usersPurchases = _.filter(purchases, { "userId": req.params.userId });
    res.json(usersPurchases);
});

router.post('/api/purchase', (req, res) => {
    let { purchase } = req.body;
    let rawdata = fs.readFileSync('src/server/data/purchases.json');
    let purchases = JSON.parse(rawdata);
    purchases.push(purchase);
    fs.writeFile("src/server/data/purchases.json", JSON.stringify(purchases), (err: any) => {
        if (err) throw err;
    });
    res.json(purchase);
});

export default router;