import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const {accessToken} = req.cookies
    if (!accessToken) {
        return res.status(409).send({ error: 'Please login first' });
    } else {
        try {
            const decoded = jwt.verify(accessToken, process.env.SECRET_TOKEN);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(403).send({ error: 'Invalid token' });
        }
    }
};