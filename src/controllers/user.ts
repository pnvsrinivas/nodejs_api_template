import { NextFunction, Request, Response } from 'express';
import { normalizeErrors } from '../helpers/mongoose';
import User, { IUser } from '../models/user';
import HttpStatusCodes from 'http-status-codes';

const getUsers = (req: Request, res: Response, next: NextFunction) => {
    try {
        User.findOne({ _id: req.user.userId }, (err: any, user: IUser) => {
            if (err) {
                return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).send({errors: normalizeErrors(err.errors)});
            }
            
    
            return res.json(user);
        });
    } catch(err) {
        next(err);
    }
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        User.deleteOne({ _id: req.user.userId }, (err: any) => {
            if (err) {
                return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).send({errors: normalizeErrors(err.errors)});
            }
            
    
            return res.json({ message: "User deleted successfully !!" });
        });
    } catch(err) {
        next(err);
    }
};

export {
    getUsers,
    deleteUser
}