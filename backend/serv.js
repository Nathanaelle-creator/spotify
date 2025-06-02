
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host:"localhost",
    user:'nathanaelle',
    password:'latouche09',
    database:'spotify'
});

db.connect();

app.post("/login", (req, res) => {
  db.query(
    "SELECT * FROM user WHERE email = ?",
    [req.body.email],
    (_, result) => {
      res.json({ userId: result[0]?.id });
    }
  );
});

app.post("/register", (req, res) => {
  db.query("INSERT INTO user SET ?", req.body, () => {
    res.status(201).json({});
  });
});

app.get("/user/:id", (req, res) => {
  db.query(
    "SELECT firstname, lastname, username, email, birthdate, phone, country FROM user WHERE id = ?",
    [req.params.id],
    (_, result) => {
      res.json(result[0]);
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
