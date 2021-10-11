import express from "express";
import {updateUserById, deleteUserById, getUserById, createUser, getUsers, genPassword, managerSignup, getManagers} from "./helper.js"
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
const app = express();

dotenv.config();

const PORT = process.env.PORT;


//Tell express what format of data we are going to get json, xml, text
//Middlewares is like a gatekeeper who converts to a unified format
//all requests body will be converted to JSON
app.use(express.json()); //In-built middleware in express

//We can write custom own middlewares or use any other third party middlewares

async function createConnection() {
  //local MongoDB url
  //   const MONGO_URL = "mongodb://localhost/users";

  //MongoDB Atlas URL
  const client = new MongoClient(process.env.MONGO_URL);

  await client.connect();
  console.log("Successfully connected");

  //Inserted new data in MongoDB Atlas
  //   client
  //     .db("users")
  //     .collection("people")
  //     .insertMany(users);

  return client;
}

createConnection();

//Get homepage
app.get("/", (request, response) => {
  response.send("Hello All Guvians!!!");
});



//Signup page
app.post("/manager/signup", async (request, response) => {
  const client = await createConnection();
  const { username, password } = request.body;
  const hashedPassword = await genPassword(password);

  const managers = await managerSignup(client, username, hashedPassword);

  console.log(managers);
  response.send(managers);
});


//Get all managers
app.get("/managers", async (request, response) => {
  const client = await createConnection();

  const managers = await getManagers(client);

  console.log(managers);
  response.send(managers);
});

//Get all users or through query
app.get("/users", async (request, response) => {
  const { color, ageGt } = request.query;
  const client = await createConnection();

  const query = {};
  if (color) {
    query.color = color;
  }
  if (ageGt) {
    query.age = { $gte: +ageGt };
  }
  const users = await getUsers(client, query);

  console.log(users);
  response.send(users);
});

//Create User
app.post("/users", async (request, response) => {
  const client = await createConnection();
  const addUsers = request.body;

  const result = await createUser(client, addUsers);

  console.log(result);
  response.send(result);
});

//Get user by ID
app.get("/users/:id", async (request, response) => {
  const client = await createConnection();
  const id = request.params.id;
  const user = await getUserById(client, id);
  response.send(user);
});

//Delete user by ID
app.delete("/users/:id", async (request, response) => {
  const client = await createConnection();
  const id = request.params.id;
  const user = await deleteUserById(client, id);
  response.send(user);
});

//Update user details
app.patch("/users/:id", async (request, response) => {
  const client = await createConnection();
  const id = request.params.id;
  const newData = request.body;
  const user = await updateUserById(client, id, newData);
  response.send(user);
});

app.listen(PORT, () => console.log("The server has started in: ", PORT));




// app.get("/users", (request, response) => {
//     const { color } = request.query;
//     const { ageGt } = request.query;
//     if (color && ageGt) {
//       response.send(
//         users.filter((user) => user.color == color && +user.ageGt >= +ageGt)
//       );
//     } else if (color) {
//       response.send(users.filter((user) => user.color == color));
//     } else if (ageGt) {
//       response.send(users.filter((user) => +user.ageGt >= +ageGt));
//     } else if (!color && !ageGt) {
//       response.send(users);
//     }
//   });
