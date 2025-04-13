import { Router } from "express";

const router = Router();

// GET /
router.get("/", (req, res) => {
  res.render("start-page");
});

// GET /profile
router.get("/profile", (req, res) => {
  res.render("profile");
});
export default router;
