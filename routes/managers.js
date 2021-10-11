import {
  genPassword,
  createConnection,
  getManagers,
  managerSignup,
} from "../helper.js";
import express from "express";

// Routes in express will help organise into different files easily based on route
//1. import router from express
const router = express.Router();
//2. replace app with router
//3. export the router & import in index.js (use in index.js)
//4. replace paths

//Signup page
router.post("/signup", async (request, response) => {
  const client = await createConnection();
  const { username, password } = request.body;
  const hashedPassword = await genPassword(password);

  const managers = await managerSignup(client, username, hashedPassword);

  console.log(managers);
  response.send(managers);
});

//Get all managers
router.get("/", async (request, response) => {
  const client = await createConnection();

  const managers = await getManagers(client);

  console.log(managers);
  response.send(managers);
});

export const managerRouter = router;
