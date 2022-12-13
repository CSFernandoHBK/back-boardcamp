import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const {Pool} = pkg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const app = express();
app.use(express.json());

app.get("/customers", async (req, res) => {
    const customers = await connection.query("SELECT * FROM customers;");
    console.log(customers);
    return res.send(customers.rows);
});

app.get("/categories", async (req, res) => {
  const categories = await connection.query("SELECT * FROM categories ");
  return res.send(categories);
})

app.post("/categories", async (req, res) => {
  const categorie = req.body;

  try{
    await connection.query(
      `INSERT INTO categories (name) VALUE (${categorie});`
    )
    res.sendStatus(201);
  } catch(err){
    console.log(err);
    res.sendStatus(500);
  }

  return res.send(categorie);
})

app.get("/games", async (req, res) => {
  const games = await connection.query("SELECT * FROM games;");
  return res.send(games);
})

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));