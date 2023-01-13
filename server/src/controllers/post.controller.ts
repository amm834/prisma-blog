import prisma from "../services/prisma.js";
import {Request, Response} from "express";

export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            id: 'desc',
        },
        include: {
            category: true,
            user: {
                select: {
                    name: true,
                }
            },
        }
    });
    res.json({posts});
}

export const createPost = async (req: Request, res: Response) => {
    const {title, content, category_id, user_id} = req.body;
    if (!title || !content) {
        return res.status(400).json({message: "Title and content are required"});
    }

    const post = await prisma.post.create({
        data: {
            title,
            content,
            categoryId: +category_id,
            userId: +user_id
        }
    });
    return res.status(201).jsonp({post});
}

export const getPostById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(404).json({message: "Post not found"});
    }
    const post = await prisma.post.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    return res.status(200).jsonp({post});
}


export const updatePostById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(404).json({message: "Post not found"});
    }
    const post = await prisma.post.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            title: req.body.title,
            content: req.body.content
        }
    });

    return res.status(200).jsonp({post});
}

export const deletePostById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(404).json({message: "Post not found"});
    }
    const post = await prisma.post.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    return res.status(200).jsonp({post});
}