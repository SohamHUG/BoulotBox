import { Request, Response } from "express";
import { usersValidation } from "../validations/users.validation";
import { APIResponse, hashPassword, logger, verifyPassword } from "../utils";
import { findByCredentilas, pushUser } from "../models/user.model";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { env } from "../config/env";
import jwt from "jsonwebtoken";

const { JWT_SECRET, NODE_ENV } = env;

export const register = async (req: Request, res: Response) => {
    try {
        const { email, firstname, lastname, type, password } = usersValidation.parse(req.body);

        const emailAlreadyExists = await findByCredentilas(email);
        if (emailAlreadyExists)
            return APIResponse(res, null, "Cet email est déjà utilisé", 400);

        const hash = await hashPassword(password);
        if (!hash)
            throw new Error("Erreur lors du hashage du mot de passe");

        const newUser = await pushUser({ email, firstname, lastname, type, password: hash });
        if (!newUser)
            return APIResponse(res, [], "Erreur lors de création de l'utilisateur", 500);

        return APIResponse(res, [newUser], 'Vous êtes inscrit');
    } catch (err: any) {

        if (err instanceof z.ZodError) return APIResponse(res, err.errors, "Formulaire incorrect", 400);
        logger.error(`Erreur lors de la création du compte utilisateur : ${err.message}`)
        // console.log(err);
        APIResponse(res, null, "Erreur server", 500);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return APIResponse(res, null, "Veuillez remplir tous les champs", 400);

        const user = await findByCredentilas(email);
        if (!user)
            return APIResponse(res, null, "Email ou mot de passe incorrect", 400);

        // const hash = await bcrypt.compare(password, user.password);
        if (await verifyPassword(password, user.password) === false)
            return APIResponse(res, null, "Email ou mot de passe incorrect", 400);

        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' })
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: NODE_ENV === "production", // signifie que le cookie ne sera envoyé que sur du HTTPS
            maxAge: 3600000, // 1h
        });

        return APIResponse(res, [], "Vous êtes connecté", 200);
    } catch (err: any) {
        logger.error(`Erreur lors de la connexion : ${err.message}`)
        console.error(err);
        APIResponse(res, null, "Erreur server", 500);
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    APIResponse(res, null, "Vous êtes déconnecté", 200)
}