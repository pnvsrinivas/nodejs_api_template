import { Request, Response } from 'express';
import { normalizeErrors } from '../helpers/mongoose';
import Match, { IMatch } from '../models/match';
import HttpStatusCodes from 'http-status-codes';
import { validationResult } from "express-validator";

const getMatches = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() });
    }
    const status = req.query.status || 1;
    const query = status ? { status: +status }: {};

    await Match.find(query)
        .select('-modified')
        .exec((err: any, foundMatches: IMatch[]) => {
  
            if (err) {
                return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).send({errors: normalizeErrors(err.errors)});
            }
        
            if (status && foundMatches.length === 0) {
                return res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).send({
                    errors: [{title: 'No Matches Found!', detail: `There are no matches for status ${status}`}]
                });
            }
    
            return res.json(foundMatches);
        });
};

export {
    getMatches,
}