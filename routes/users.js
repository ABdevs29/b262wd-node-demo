import {
  updateUserById,
  deleteUserById,
  getUserById,
  createUser,
  getUsers,
  createConnection,
} from "../helper.js";
import express from "express";

const router = express.Router();

//Get all users or through query
router.get("/", async (request, response) => {
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
router.post("/", async (request, response) => {
  const client = await createConnection();
  const addUsers = request.body;

  const result = await createUser(client, addUsers);

  console.log(result);
  response.send(result);
});

//Get user by ID
router.get("/:id", async (request, response) => {
  const client = await createConnection();
  const id = request.params.id;
  const user = await getUserById(client, id);
  response.send(user);
});

//Delete user by ID
router.delete("/:id", async (request, response) => {
  const client = await createConnection();
  const id = request.params.id;
  const user = await deleteUserById(client, id);
  response.send(user);
});

//Update user details
router.patch("/:id", async (request, response) => {
  const client = await createConnection();
  const id = request.params.id;
  const newData = request.body;
  const user = await updateUserById(client, id, newData);
  response.send(user);
});

export const usersRouter = router;
