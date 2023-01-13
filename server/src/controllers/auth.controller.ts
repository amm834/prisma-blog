import {Request, Response} from "express";
import bcrypt from "bcrypt";
import prisma from "../services/prisma.js";
import jwt from "jsonwebtoken";

async function getUserByEmail(email: string) {
    return await prisma.user.findFirst({
        where: {
            email: email
        },
        select: {
            email: true,
            password: true,
            name: true,
            id: true
        }
    });
}

export const register = async (req: Request, res: Response) => {
    const {email, password, name,} = req?.body;

    if (!email || !password || !name) {
        return res.status(400).jsonp({message: "All fields are required."});
    }


    try {

        const existedUser = await getUserByEmail(email);

        if (existedUser) return res.status(400).jsonp({msg: "User with this email already exist",});

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            }
        });

        return res.status(201).jsonp({msg: "User created successfully", user});
    } catch (error) {
        return res.status(400).jsonp({error})
    }

}

export const login = async (req: Request, res: Response) => {
    const {email, password,} = req?.body;

    if (!email || !password) {
        return res.status(400).jsonp({message: "Email and Password field are required"});
    }
    try {
        const existedUser = await getUserByEmail(req?.body?.email);

        if (!existedUser) return res.status(400).jsonp({msg: "Email or Password is wrong",});

        // compare password
        const isMatch = await bcrypt.compare(password, existedUser?.password);

        if (!isMatch) return res.status(400).jsonp({msg: "Email or Password is wrong",});

        const token = jwt.sign({
            user: existedUser
        }, 'secret', {expiresIn: '24h'});

        return res.cookie("access_token", token, {
            httpOnly: true
        })
            .status(200)
            .jsonp({
                msg: "Login successfully",
                user: {email: existedUser?.email, name: existedUser?.name, id: existedUser?.id}
            });

    } catch (error) {
        return res.status(400).jsonp({error})
    }
}


export const logout = async (req: Request, res: Response) => {
    return res.clearCookie("access_token").status(200).jsonp({msg: "Logout successfully"});
}