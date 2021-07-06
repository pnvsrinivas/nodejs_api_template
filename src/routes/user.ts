import { Router } from "express";
import { getUsers } from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";

const router: Router = Router();

router.get("/:id", authMiddleware, getUsers);
  
export default router;