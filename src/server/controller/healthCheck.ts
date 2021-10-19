import { Request, Response } from "express";

const healthCheck = async (req: Request, res: Response) => {
	try {
		return res.json({ ok: true });
	} catch (err) {
		console.error(err);
	}
};

export default healthCheck;