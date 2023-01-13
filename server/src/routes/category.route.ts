import {IRouter, Router} from "express";
import {getAllCategories} from "../controllers/category.controller.js";

export const router: IRouter = Router();

router.get('/', getAllCategories);


