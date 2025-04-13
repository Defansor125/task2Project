//  объединяющий файл роутов
import { Router } from "express";
import authRoutes from "./auth.routes.ts";
import userRoutes from "./user.routes.ts";

const router = Router();

router.use(authRoutes);
router.use(userRoutes);

export default router;
