import express, { Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import routes from "./routes/index.route"

const app = express();
const { PORT, FRONTEND_URL } = env;


app.use(cookieParser());

app.use(cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
})