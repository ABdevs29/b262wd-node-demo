import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();

dotenv.config();

const PORT = process.env.PORT;
// const users = [
//   {
//     createdAt: "2021-10-01T00:49:47.780Z",
//     name: "Bennie Aufderhar",
//     avatar: "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
//     ageGt: 59,
//     color: "silver",
//     id: "5",
//   },
//   {
//     createdAt: "2021-09-30T14:22:51.638Z",
//     name: "Lana Witting",
//     avatar: "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
//     ageGt: 77,
//     color: "olive",
//     id: "6",
//   },
//   {
//     createdAt: "2021-09-30T18:01:06.642Z",
//     name: "Vickie Brekke",
//     avatar: "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
//     ageGt: 80,
//     color: "tan",
//     id: "7",
//   },
//   {
//     createdAt: "2021-09-30T09:39:22.586Z",
//     name: "Al Runolfsdottir",
//     avatar: "https://cdn.fakercloud.com/avatars/areus_128.jpg",
//     ageGt: 28,
//     color: "orange",
//     id: "8",
//   },
//   {
//     createdAt: "2021-09-30T18:22:41.955Z",
//     name: "Sam Orn",
//     avatar: "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
//     ageGt: 49,
//     color: "indigo",
//     id: "9",
//   },
//   {
//     createdAt: "2021-09-30T18:30:05.224Z",
//     name: "Grace Grimes",
//     avatar: "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
//     ageGt: 72,
//     color: "yellow",
//     id: "10",
//   },
//   {
//     createdAt: "2021-09-30T11:26:57.667Z",
//     name: "Cindy Reinger",
//     avatar: "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
//     ageGt: 30,
//     color: "yellow",
//     id: "11",
//   },
//   {
//     createdAt: "2021-10-01T06:26:55.203Z",
//     name: "Beth Koelpin",
//     avatar: "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
//     ageGt: 0,
//     color: "purple",
//     id: "12",
//   },
//   {
//     createdAt: "2021-09-30T12:28:17.426Z",
//     name: "Doug Mayer",
//     avatar: "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
//     ageGt: 25,
//     color: "cyan",
//     id: "13",
//   },
//   {
//     createdAt: "2021-10-01T01:09:41.654Z",
//     name: "Mrs. Garrett Becker",
//     avatar: "https://cdn.fakercloud.com/avatars/increase_128.jpg",
//     ageGt: 20,
//     color: "yellow",
//     id: "14",
//   },
// ];

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

//Get all users or through query
app.get("/users", async (request, response) => {
  const { color, ageGt } = request.query;
  const client = await createConnection();

  const query = {};
  if (color) {
      query.color = color;
  }
  if (ageGt) {
      query.age = {$gte: +ageGt};
  }
  const users = await client
  .db("users")
  .collection("people")
  .find(query).toArray();

  console.log(users);
  response.send(users);
});

//Create User
app.post("/users", async (request, response) => {
    const client = await createConnection();
    const addUsers = request.body;
  
    const result = await client
  .db("users")
  .collection("people")
  .insertMany(addUsers);

  console.log(result);
    response.send(result);
  });

  //Get user by ID
app.get("/users/:id", async (request, response) => {
  const client = await createConnection();
  const id = request.params.id;
  const user = await client
    .db("users")
    .collection("people")
    .findOne({ id: id });
  response.send(user);
});

//Delete user by ID
app.delete("/users/:id", async (request, response) => {
    const client = await createConnection();
    const id = request.params.id;
    const user = await client
      .db("users")
      .collection("people")
    //   .findOne({ id: id })
      .deleteOne({ id: id });
    response.send(user);
  });

  //Update user details
  app.patch("/users/:id", async (request, response) => {
    const client = await createConnection();
    const id = request.params.id;
    const newData = request.body;
    const user = await client
      .db("users")
      .collection("people")
      .updateOne({ id: id }, {$set: newData});
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