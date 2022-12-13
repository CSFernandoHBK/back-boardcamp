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

app.get("/teste", async (req, res) => {
    return res.send();
})

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));