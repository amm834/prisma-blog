import {IRouter, Router} from "express";
import {createPost, deletePostById, getAllPosts, getPostById, updatePostById} from "../controllers/post.controller.js";

export const router: IRouter = Router();

router
    .get("/", getAllPosts)
    .post("/create", createPost)
    .get("/:id", getPostById)
    .post("/:id/update", updatePostById)
    .delete("/:id/delete", deletePostById)

