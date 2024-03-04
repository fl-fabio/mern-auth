import jwt from 'jsonwebtoken';

export const createSecretToken = (id: string) => {
    return jwt.sign({id}, 'fabio', {
        expiresIn: 3*24*60*60
    });
};