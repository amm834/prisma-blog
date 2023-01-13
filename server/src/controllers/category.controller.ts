import prisma from "../services/prisma.js";
import {Request, Response} from "express";

export const getAllCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.status(200).json({categories});
}

