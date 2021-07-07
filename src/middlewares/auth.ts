import { Response, NextFunction, Request } from "express";
import HttpStatusCodes from "http-status-codes";
import { verify } from '../services/jwt';

const authenticate = function(req: Request, res: Response, next: NextFunction): any {
    
    const token = req.header("x-auth-token"); // Get token from header

    if (!token) { // Check if no token
        return res
            .status(HttpStatusCodes.UNAUTHORIZED)
            .json({ message: "No token, authorization denied" });
    }
    
    // Verify token
    try {
        req.user = verify(token);
        next();
    } catch (err) {
        res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: "Token is not valid or expired" });
    }
};

const authorize = (...roles: string[]) => {
    return [
        authenticate,
        (req: Request, res: Response, next: NextFunction) => {
            
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            next(); // authentication and authorization successful
        }
    ]
}

export {
    authorize,
    authenticate
}