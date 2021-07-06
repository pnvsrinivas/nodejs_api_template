import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "../controllers/auth";

const router: Router = Router();

router.post(
    "/register",
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 })
    ],
    register
);

router.post(
    "/login",
    [
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 })
    ],
    login
);
  
export default router;