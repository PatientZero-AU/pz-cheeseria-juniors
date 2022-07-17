import { Request, Response } from 'express';
import { promises as fs } from 'fs';

class OrdersController {
  /**
   * @desc      Create new Order
   * @route     Post /orders
   */
  createOrder = async (req: Request, res: Response): Promise<Response> => {
    let existingOrdersArray = [];

    try {
      const existingOrdersString = await fs.readFile(
        'src/server/data/orders.json',
        'utf-8'
      );

      if (existingOrdersString.length) {
        existingOrdersArray = JSON.parse(existingOrdersString);
      }
      const { newOrder } = req.body;
      existingOrdersArray.push(newOrder);
      await fs.writeFile(
        'src/server/data/orders.json',
        JSON.stringify(existingOrdersArray),
        'utf-8'
      );
    } catch (err) {
      console.error('Database read error', err.message);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: 'Purchased successfully.',
    });
  };
}

export default new OrdersController();
