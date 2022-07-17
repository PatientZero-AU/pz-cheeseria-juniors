import { Request, Response } from 'express';
const cheeses = require('../data/cheeses.json');

class CheesesController {
  /**
   * @desc      Get all purchasable cheeses
   * @route     Get /cheeses
   */
  getCheeses = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send(cheeses);
  };
}

export default new CheesesController();
