import { Request, Response } from 'express';
import { promises as fs } from 'fs';

interface PurchasingItem {
  id: number;
  amount: number;
  price: number;
}
interface IOderModel {
  orderId: number;
  items: PurchasingItem[];
}

class OrdersController {
  /**
   * @desc      Create new Order
   * @route     Post /orders
   */
  createOrder = async (req: Request, res: Response): Promise<Response> => {
    let existingOrdersArray: IOderModel[] = [];

    try {
      const existingOrdersString = await fs.readFile(
        'src/server/data/orders.json',
        'utf-8'
      );

      if (existingOrdersString.length) {
        existingOrdersArray = JSON.parse(existingOrdersString);
      }
      const { purchasingItems }: { purchasingItems: PurchasingItem[] } =
        req.body;
      existingOrdersArray.push({
        orderId: existingOrdersArray.length + 1,
        items: purchasingItems,
      });
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

  /**
   * @desc      Get all Orders
   * @route     Get /orders
   */
  getOrders = async (req: Request, res: Response): Promise<Response> => {
    // Read the orders file.
    let ordersArray: IOderModel[] = [];
    try {
      const existingOrdersString = await fs.readFile(
        'src/server/data/orders.json',
        'utf-8'
      );
      if (existingOrdersString.length) {
        ordersArray = JSON.parse(existingOrdersString);
      }
      ordersArray.sort((a, b) => b.orderId - a.orderId);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: ordersArray,
    });
  };
}

export default new OrdersController();
