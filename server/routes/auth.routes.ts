import { Router } from "express";
import { promises as fs } from "fs";
import { sha256, userValidation, addUser } from "../services/auth.service.js";
import { Request } from "express";

type ValidKeys = "email" | "password" | "name" | "surname" | "birthdate" | "id";
type User = Record<ValidKeys, string | null>;

const router = Router();

const data = await fs.readFile("./db.json", "utf-8");
const users = JSON.parse(data) as User[];

// GET /sign-up
router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

// PATCH /sign-up
router.patch("/sign-up", async (req: Request<{}, {}, User>, res) => {
  const { email, password, name, surname, birthdate }: User = req.body;

  let userAnswer: User = {
    email,
    password,
    name,
    surname,
    birthdate,
    id: null,
  };

  userAnswer = userValidation(userAnswer);
  const user = users.find(
    (user: { email: string | null }) => user.email === email
  );
  if (user) {
    userAnswer.email = null;
    res.json(userAnswer);
    return;
  }

  if (await addUser(userAnswer)) {
    res.json({ success: true });
  } else res.json(userAnswer);
});

// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await sha256(password);

  const user = users.find(
    (user: { email: string | null; password: string | null }) =>
      user.email === email && user.password === hashedPassword
  );

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

export default router;
