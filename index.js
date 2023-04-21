const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials:true,
    mehtods:['GET' , 'POST' , 'PUT' , 'DELETE']
  }
))
app.use(cookieParser())
app.use(express.json());

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sachin@ms1",
  database: "todo_bdm",
});

connection.connect((err) => { 
  if (err) {
    throw err;
  } else {
    console.log("succesfully connected with db");
  }
});

app.set("view engine", "ejs");


///////////////******************** user apis*********************///////////////*/

//creating the user

app.post("/user/create", (req, res) => {
  // Registering a new user
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  connection.query(
    `INSERT INTO user (name, email, password_hash) VALUES ('${name}', '${email}', '${passwordHash}')`,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});


//  make user login
app.post("/user/login", (req, res) => {
  // Authenticating a user and generating a JWT token
  const { email, password } = req.body;
  connection.query(
    `SELECT * FROM user WHERE email='${email}'`,
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(401).json({ message: "Invalid email or password" });
      } else {
        const user = result[0];
        if (bcrypt.compareSync(password, user.password_hash)) {
          const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            "secretkey",
            { expiresIn: "24h" }
          );
          const cookieData = res.cookie("token", token, { httpOnly: true });
          res.json({ token });
        } else {
          res.status(401).json({ message: "Invalid email or password" });
        }
      }
    }
  );
});

// authentication middleware code for taks
const verifyToken = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "No token provided" });
  } else {
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};


//**************************************code for the task********************** */

// getting all task
app.get("/task/all", verifyToken, (req, res) => {
  // Retrieving all tasks for a user from the database
  const userId = req.userId;
  connection.query(
    `SELECT * FROM task WHERE user_id=${userId}`,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});


// Inserting a new task into the database
app.post("/task/create", verifyToken, (req, res) => {
  const { description , status} = req.body;
  // const status = "pending";
  const userId = req.userId;
  connection.query(
    `INSERT INTO task (description, status, user_id) VALUES ('${description}', '${status}', '${userId}')`,
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});


// updating the task
app.put("/tasks/:id", verifyToken , (req, res) => {
  const taskId = req.params.id;
  const task = req.body.task; 

  connection.query(
    "UPDATE task SET description = ?, status = ?, updated_at = NOW() WHERE id = ?",
    [task.description, task.status, taskId],
    (err, results) => {
      if (err) throw err;
      res.send("Task updated successfully");
    }
  );
});


// deleting the task
app.get("/task/delete/:id", verifyToken , async (req, res) => {
  try {
    const id = req.params.id;
    await connection.query("DELETE FROM task WHERE id = ?", [id]);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



let PORT = 3001
app.listen(PORT, () => {
  console.log("Server started on port" , PORT);
});
