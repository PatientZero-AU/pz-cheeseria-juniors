import * as express from 'express';
const fs = require('fs');
const cheeses = require('./data/cheeses.json');

const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
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