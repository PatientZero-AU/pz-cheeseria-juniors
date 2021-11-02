import * as express from 'express';
const { randomBytes } = require("crypto");
const cheeses = require('./data/cheeses.json');
const orders = require('./orders');

const router = express.Router();


router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});

router.post('/api/orders', (req, res, next)=> {
    const id : string = randomBytes(4).toString("hex");
    const orderItems : OrderItemsType[] = req.body;

    orders[id] = {id, items: orderItems}
  
    res.send(orders[id]);
});

export default router;