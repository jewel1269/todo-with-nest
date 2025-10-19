import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default-secret';

export const generateToken = (userInfo: { id: number; email: string }) => {
  try {
    const token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error('Token generation failed');
  }
};
