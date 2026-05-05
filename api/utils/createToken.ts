import jwt from 'jsonwebtoken';

export const createToken = (payload: object) => {
  return jwt.sign(payload, process.env.SECRET_TOKEN!, { expiresIn: '8h' });
};