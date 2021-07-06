import fs from 'fs';
import jsonwebtoken, { SignOptions, VerifyOptions, Jwt } from 'jsonwebtoken';

var privateKEY 	= fs.readFileSync('./private.key', 'utf8'); // to sign JWT
var publicKEY 	= fs.readFileSync('./public.key', 'utf8'); 	// to verify JWT
const issuer = 'Namma11'; // Issuer (Software organization who issues the token)
const subject = 'auth@namma11.com'; // Subject (intended user of the token)
const audience = 'http://namma11.com'; // Audience (Domain within which this token will live and function)

const signIn = (payload: any, options: any = {}) => {
    const signOptions: SignOptions = {
        issuer: 	options.issuer || issuer,
        subject: 	options.subject || subject,
        audience: 	options.audience || audience,
        expiresIn: 	"30d",				// 30 days validity
        algorithm: 	"RS256" 			// RSASSA options[ "RS256", "RS384", "RS512" ]
    };

    return jsonwebtoken.sign(payload, privateKEY, signOptions);
};

const verify = (token: string, options: any = {}) => {
    const verifyOptions: VerifyOptions = {
        issuer: 	options.issuer || issuer,
        subject: 	options.subject || subject,
        audience: 	options.audience || audience,
        maxAge:     "30d",
        algorithms: ["RS256"] 			// RSASSA options[ "RS256", "RS384", "RS512" ]
    };

    return jsonwebtoken.verify(token, publicKEY, verifyOptions);
};

const decode = (token: string): Jwt => {
    return jsonwebtoken.decode(token, {complete: true}) || ({} as Jwt);
}

export {
    signIn,
    verify,
    decode
}