import express from "express";
// import cors from "cors"
// import cookieParser from "cookie-parser";

const app = express();
// const { PORT, FRONTEND_URL } = env;


// app.use(cookieParser());

// app.use(cors({
//     origin: FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true
// }));


app.use(express.json()); // le payload (le body) de la req sera accessible dans toutes mes routes depuis req.body
app.use(express.urlencoded({ extended: true })); // lire le body lorsque le payload sera de type form-data-urlencoded (formulaire)


// app.use(routes);

// app.listen(PORT, () => {
//     console.log(`Serveur lancé sur http://localhost:${PORT}`);
// })