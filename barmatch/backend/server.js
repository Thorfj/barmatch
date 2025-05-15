const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // substitui body-parser.json()

// Configurar conexão com o banco PostgreSQL
const pool = new Pool({
  connectionString:
    "postgresql://barmatch_db_user:gOgrkvVw31w6QPS7oCo9LJESFHYF89YN@dpg-d0iv28l6ubrc73cjc1bg-a.oregon-postgres.render.com:5432/barmatch_db",
  ssl: {
    rejectUnauthorized: false,
  },
});

// Rota para receber e salvar avaliações
app.post("/avaliacoes", async (req, res) => {
  const { nome, nota, favorito, comentario, evento } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO avaliacoes (nome, nota, favorito, comentario, evento) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nome, nota, favorito, comentario, evento]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao salvar avaliação:", error);
    res.status(500).send("Erro ao salvar avaliação");
  }
});

// Rota para listar todas as avaliações
app.get("/avaliacoes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM avaliacoes ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
