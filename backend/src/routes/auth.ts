import expressRouter, { Router, Request, Response } from "express";
import pool from "../db";
const router: Router = expressRouter.Router();
import bcrypt from "bcrypt";
import jwtGenerator from "../utilities/jwtGenerator";
import authorize from "../middleware/authorize";

// register route
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    // if user already exists
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists with given email!");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    res.send("Registered Successfully!");
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

// login route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send("Password or email is incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).send("Password or email is incorrect");
    }

    const token = jwtGenerator(user.rows[0].user_id);

    res.send({ token });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send("Server Error!");
  }
});

// checks if user is authorized
router.get("/is-verified", authorize, async (req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error!");
  }
});

export default router;
