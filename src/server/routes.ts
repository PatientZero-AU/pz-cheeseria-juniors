import * as express from 'express';
import CheesesController from './controllers/cheeses.controller';
import OrdersController from './controllers/orders.controller';

const router = express.Router();

router.get('/api/cheeses', CheesesController.getCheeses);

// Creating orders with items
router.get('/api/orders', OrdersController.getOrders);
router.post('/api/orders', OrdersController.createOrder);

export default router;
