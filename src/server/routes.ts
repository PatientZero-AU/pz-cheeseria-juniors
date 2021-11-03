import * as express from 'express';
const { randomBytes } = require("crypto");
const cheeses = require('./data/cheeses.json');
const orders = require('./orders');
const recentItems = require('./recentItems');

const router = express.Router();


router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});

router.get('/api/orders/recent', (req, res, next) => {

    res.send(recentItems.map((itemId: number) => 
        cheeses.find((cheese: { id: number; }) => itemId === cheese.id)
    ));
});

router.post('/api/orders', (req, res, next)=> {
    const id : string = randomBytes(4).toString("hex");
    const orderItems : OrderItemsType[] = req.body;

    orderItems.forEach((orderItem)=> {
        const itemIndex = recentItems.indexOf(orderItem.id);
        if(itemIndex === -1){
            recentItems.unshift(orderItem.id)
        }
        else{
            recentItems.splice(itemIndex,1)
            recentItems.unshift(orderItem.id)

        }
    })

    orders[id] = {id, items: orderItems}
  
    res.send(orders[id]);
});

export default router;