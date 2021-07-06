import { Router } from 'express';
import { greetings } from '../controllers/home';

const router = Router();

router.get('', greetings);

export default router;