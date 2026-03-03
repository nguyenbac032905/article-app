import { NextFunction, Request,Response } from "express";
import User from "../models/user.model";

export const requireAuth = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    const author = req.headers.authorization;
    if(author){
        const token = author.split(" ")[1];
        const user = await User.findOne({deleted: false, token: token}).select("-password");
        req["user"] = user;
    }
    next();
}