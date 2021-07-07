import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/user";
import { authenticate, authorize } from "../middlewares/auth";
import Role from './../helpers/role';

const router: Router = Router();

router.get("/:id", authenticate, getUsers);
router.delete("/:id", authorize(Role.ADMIN, Role.USER), deleteUser);
  
export default router;