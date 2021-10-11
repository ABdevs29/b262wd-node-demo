import express from "express";
import { managerRouter } from "./routes/managers.js";
import { usersRouter } from "./routes/users.js";
import { createConnection } from "./helper.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT;

//Tell express what format of data we are going to get json, xml, text
//Middlewares is like a gatekeeper who converts to a unified format
//all requests body will be converted to JSON
app.use(express.json()); //In-built middleware in express

//We can write custom own middlewares or use any other third party middlewares

createConnection();

//Get homepage
app.get("/", (request, response) => {
  response.send("Hello All Guvians!!!");
});

app.use("/managers", managerRouter);

app.use("/users", usersRouter)


app.listen(PORT, () => console.log("The server has started in: ", PORT));

