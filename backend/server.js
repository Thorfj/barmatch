const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // <- IMPORTANTE para o Render

app.use(cors()); // <- Permite que o front-end se comunique com o back-end
app.use(bodyParser.json());

let eventos = [];

app.post("/evento", (req, res) => {
  const evento = req.body;
  eventos.push(evento);
  res.status(201).json({ message: "Evento salvo com sucesso!" });
});

app.get("/eventos", (req, res) => {
  res.json(eventos);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
