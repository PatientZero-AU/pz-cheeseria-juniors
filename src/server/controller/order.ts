import { Request, Response } from "express";
import Order from "../model/Order";

export const createOrder = async (req: Request, res: Response) => {
	try {
		const order = req.body;
		const newORder = await new Order(order).save();
		res.status(201).send(newORder);
	} catch (err) {
		console.log(err);
		res.status(400).send("Error: " + JSON.stringify(err));
	}
};

export const getOrders = async (req: Request, res: Response) => {
	try {
		const orders = await Order.find().exec()
		res.json(orders);
	} catch (err) {
		console.error(err);
		res.sendStatus(500)
	}
};
