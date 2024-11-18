const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());

// Conexão ao MongoDB
mongoose
  .connect(
    "mongodb+srv://aluno:YO2vKq9AZ2ecUs5D@cluster0.gcd7h.mongodb.net/library" 
  )
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Importação das rotas
const booksRoutes = require("./routes/books");
app.use("/api/books", booksRoutes);

// Definir a porta do servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
