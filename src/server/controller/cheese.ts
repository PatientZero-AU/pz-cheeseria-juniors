import { Request, Response } from "express";
import Cheese from '../model/Cheese'

export const getCheeses = async (req: Request, res: Response) => {
	try {
		const cheeses = await Cheese.find()
		return res.json(cheeses);
	} catch (err) {
		console.error(err);
	}
		
};
