import { logger } from "./"
import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string | void> => {
    if (!password || password.length < 6) {
        logger.error('Mot de passe invalide')
        return;
    }

    try {
        return await bcrypt.hash(password, 10);
    } catch (err) {
        logger.error(`Erreur hashage : ${err}`)
    }
}