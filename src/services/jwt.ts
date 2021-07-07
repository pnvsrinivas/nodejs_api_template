import fs from 'fs';
import jsonwebtoken, { SignOptions, VerifyOptions, Jwt } from 'jsonwebtoken';

var privateKey 	= fs.readFileSync('./private.key', 'utf8'); // to sign JWT
var publicKey 	= fs.readFileSync('./public.key', 'utf8'); 	// to verify JWT
const issuer = 'Namma11'; // Issuer (Software organization who issues the token)
const subject = 'auth@namma11.com'; // Subject (intended user of the token)
const audience = 'http://namma11.com'; // Audience (Domain within which this token will live and function)
const tokenExpiresIn = "1d";
const algorithm = "RS256"; // RSASSA options[ "RS256", "RS384", "RS512" ]

const signIn = (payload: any) => {
    const signOptions: SignOptions = {
        issuer,
        subject,
        audience,
        expiresIn: tokenExpiresIn,
        algorithm: algorithm
    };

    return jsonwebtoken.sign(payload, privateKey, signOptions);
};

const verify = (token: string) => {
    const verifyOptions: VerifyOptions = {
        issuer,
        subject,
        audience,
        maxAge: tokenExpiresIn,
        algorithms: [algorithm]
    };

    return jsonwebtoken.verify(token, publicKey, verifyOptions);
};

const decode = (token: string): Jwt => {
    return jsonwebtoken.decode(token, {complete: true}) || ({} as Jwt);
}

export {
    signIn,
    verify,
    decode
}