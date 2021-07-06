import { Request, Response } from 'express';
import { normalizeErrors } from '../helpers/mongoose';
import User, { IUser } from '../models/user';
import HttpStatusCodes from 'http-status-codes';
import { validationResult } from "express-validator";
import { signIn, decode } from '../services/jwt';

const login = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    if (!password || !email) {
        return res.status(400).send({errors: [{title: 'Unauthorized!', detail: 'Please provide email and password!'}]});
    }

    User.findOne({ email }, function(err: any, user: IUser) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
    
        if (!user) {
            return res.status(404).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]});
        }
    
        if (user.hasSamePassword(password)) {
            const token = signIn({
                userId: user.id,
                email: user.email
            });
            const { payload, header } = decode(token);
            return res.json({ token, email: user.email, ...payload, ...header });
        } else {
            return res.status(422).send({errors: [{title: 'Unauthorized!', detail: 'Wrong email or password'}]});
        }
    });
};

const register = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    const { email, password, passwordConfirmation } = req.body;
    
    if (!password || !email || !passwordConfirmation) {
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email, password and passwordConfirmation!'}]});
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({errors: [{title: 'Invalid password!', detail: 'Password is not a same as confirmation!'}]});
    }

    User.findOne({ email }, (err: any, existingUser: IUser) => {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
    
        if (existingUser) {
            return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User with this email already exist!'}]});
        }
    
        const user = new User({
          email,
          password
        });
    
        user.save(function(err: any) {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
    
          return res.json({'message': "User registered successfully!!"});
        })
    });
};

export {
    register,
    login
}