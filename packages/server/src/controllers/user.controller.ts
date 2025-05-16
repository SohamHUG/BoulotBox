import { Request, Response } from "express";
import { findAllUsers } from "../models/user.model";
import { APIResponse, logger } from "../utils";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        logger.info("[GET] /users - Récupérer tout les utilisateurs");

        const users = await findAllUsers();
        return APIResponse(res, users, "Utilisateurs récupérés avec succès")
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération des utilisateurs : ${err.message}`)
        console.error(err);
        APIResponse(res, null, "Erreur server", 500);
    }
}