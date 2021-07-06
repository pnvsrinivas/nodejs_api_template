import { Router } from 'express';
import { getMatches } from '../controllers/match';
import { check } from "express-validator";

const router = Router();

router.get(
    '', 
    [
        check("status", "Please include a valid status").isNumeric(),
    ],
    getMatches
);

export default router;