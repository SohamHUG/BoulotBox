import { z } from "zod";

export const usersValidation = z.object({
    firstname: z.string().min(1, { message: "Prénom requis !" }),
    lastname: z.string().min(1, { message: "Nom requis !" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z.string()
        .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
        .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Le mot de passe doit contenir au moins un symbole" }),
    type: z.enum(["freelance", "client"], {message: "Type de compte invalide"})
})