import { Request, Response } from "express";
import Cheese from '../model/Cheese'
const mockCheese = require('../data/cheeses.json') 

export const getCheeses = async (req: Request, res: Response) => {
	try {
		//const cheeses = await Cheese.find()
		res.json(mockCheese);
	} catch (err) {
		console.error(err);
	}
		
};
