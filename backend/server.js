const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Para aceitar dados JSON no corpo da requisição
app.use(bodyParser.json());

// Armazenamento temporário dos dados dos eventos (exemplo simples)
let eventos = [];

// Endpoint para salvar os dados do evento
app.post("/evento", (req, res) => {
  const evento = req.body;
  eventos.push(evento); // Adiciona o evento ao array
  res.status(201).json({ message: "Evento salvo com sucesso!" });
});

// Endpoint para obter os dados dos eventos
app.get("/eventos", (req, res) => {
  res.json(eventos); // Retorna todos os eventos cadastrados
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
