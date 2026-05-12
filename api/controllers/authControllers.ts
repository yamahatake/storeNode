import userModel from "../models/userModel";
import bcrpty from 'bcrypt';
import { createToken } from "../utils/createToken";

class AuthControllers {
  userLogin = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
      const findUser = await userModel.findOne({ email }).select('+password');

      if (!findUser) {
        return res.status(401).send({ error: 'Invalid email or password' });
      }

      const isPasswordMatch = await bcrpty.compare(password, findUser.password);

      if (isPasswordMatch) {
        const { password: _, ...data } = findUser.toObject();
        const token = createToken({id: findUser._id, role: findUser.role});
        res.cookie('accessToken', token, { expires: new Date(Date.now() + 8 * 60 * 60 * 1000), httpOnly: true });
        res.status(200).send(data);
      } else {
        res.status(401).send({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  };
  userRegistration = async (req: any, res: any) => {
    const { name, email, password, role, profile_picture } = req.body;
    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ error: 'User already exists' });
      }
      const hashedPassword = await bcrpty.hash(password, 10);
      const newUser = new userModel({ name, email, password: hashedPassword, role, profile_picture });
      await newUser.save();
      const { password: _, ...data } = newUser.toObject();
      res.status(201).send(data);
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  };
  getCurrentUser = async (req: any, res: any) => {
    res.status(200).send(req.user);
  };
}

export default new AuthControllers();
