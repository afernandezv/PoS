import express from "express";
import path from "path";

import { alumnos } from "./data.js";

const app = express();
const port = 3000;

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/alumnos", (req, res) => {
    res.json(alumnos)
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/alumnos", (req, res) => {
    let alumno = req.body;
    console.log(alumno);
    alumnos.push(alumno);
    res.json(alumnos)
});

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}!`));