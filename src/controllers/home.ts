import { Request, Response } from 'express';
import { normalizeErrors } from '../helpers/mongoose';
import HttpStatusCodes from 'http-status-codes';

const greetings = (req: Request, res: Response) => {
    res.send("Welcome to Namma11 Admin app !!");
};

export {
    greetings,
}