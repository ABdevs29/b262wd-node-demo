import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

export async function updateUserById(client, id, newData) {
  return await client
    .db("users")
    .collection("people")
    .updateOne({ id: id }, { $set: newData });
}

export async function deleteUserById(client, id) {
  return await client.db("users").collection("people").deleteOne({ id: id });
}

export async function getUserById(client, id) {
  return await client.db("users").collection("people").findOne({ id: id });
}

export async function createUser(client, addUsers) {
  return await client.db("users").collection("people").insertMany(addUsers);
}

export async function getUsers(client, query) {
  return await client.db("users").collection("people").find(query).toArray();
}

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function managerSignup(client, username, hashedPassword) {
  return await client
    .db("users")
    .collection("managers")
    .insertOne({ username: username, password: hashedPassword });
}

export async function getManagers(client) {
  return await client.db("users").collection("managers").find({}).toArray();
}

export async function createConnection() {
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
