import { Request, Response } from "express";
import { usersValidation } from "../validations/users.validation";
import { APIResponse, hashPassword, logger } from "../utils";
import { findByCredentilas, pushUser } from "../models/user.model";
import { z } from "zod";


export const register = async (req: Request, res: Response) => {
    try {
        const { email, firstname, lastname, role, password } = usersValidation.parse(req.body);

        const emailAlreadyExists = await findByCredentilas(email);
        if (emailAlreadyExists) return APIResponse(res, null, "Cet email est déjà utilisé", 400);

        const hash = await hashPassword(password);
        if (!hash) throw new Error("Erreur lors du hashage du mot de passe");

        const newUser = await pushUser({ email, firstname, lastname, role, password: hash });
        if (!newUser) return APIResponse(res, [], "Erreur lors de création de l'utilisateur", 500);

        return APIResponse(res, [newUser], 'Vous êtes inscrit');
    } catch (err: any) {

        if (err instanceof z.ZodError) return APIResponse(res, err.errors, "Formulaire incorrect", 400);
        logger.error(`Erreur lors de la création du compte utilisateur : ${err.message}`)
        // console.log(err);
        APIResponse(res, null, "Erreur server", 500);
    }
}