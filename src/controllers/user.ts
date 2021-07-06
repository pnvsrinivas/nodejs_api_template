import { Request, Response } from 'express';
import { normalizeErrors } from '../helpers/mongoose';
import User, { IUser } from '../models/user';
import HttpStatusCodes from 'http-status-codes';

const getUsers = (req: Request, res: Response) => {
    User.findOne({ _id: req.user.userId }, (err: any, user: IUser) => {
        if (err) {
            return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).send({errors: normalizeErrors(err.errors)});
        }

        return res.json(user);
    });
};

export {
    getUsers,
}