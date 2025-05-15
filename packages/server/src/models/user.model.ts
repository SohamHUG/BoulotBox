import { copyFileSync } from "fs";
import { db } from "../config/pool";
import { NewUser } from "../entities/User";
import { users } from "../schemas";
import { logger } from "../utils";
import { eq } from "drizzle-orm";

export const findByCredentilas = (email: string) => {
    try {
        return db.query.users.findFirst({
            where: eq(users.email, email),
            columns: {
                id: true,
                email: true,
                password: true,
            }
        })
    } catch (err: any) {
        logger.error(`Erreur lors de la récupération de l'utilisateur : ${err.message}`)
        console.log(err);
        throw new Error('Impossible de récupérer l\'utilisateur')
    }
}

export const pushUser = (user: NewUser) => {
    try {
        return db.insert(users).values(user).returning({ id: users.id, firstname: users.firstname }).execute();
    } catch (err: any) {
        logger.error(`Erreur lors de la création de l'utilisateur`);
        throw new Error('Impossible de créer l\'utilisateur')
    }
}