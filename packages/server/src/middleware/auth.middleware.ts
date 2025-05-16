import { NextFunction, Request, Response } from "express";
import { APIResponse, logger } from "../utils";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = env;

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken)
        return APIResponse(res, null, "Vous devez vous connecter", 401);

    try {
        const verify = jwt.verify(accessToken, JWT_SECRET);
        // console.log(verify);
        next();
    } catch (err: any) {
        // logger.error("Token invalide");
        APIResponse(res, null, "Token invalide", 500);
    }
}