import { register } from '../services/auth-service.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { login as loginService } from '../services/auth-service.js';

const registerUser = async (req, res) => {
  const result = await register(req.body);
  res.status(result.status).json(result);
};

const loginUser = async (req, res) => {
  const result = await loginService(req.body, res);
  res.status(result.status).json(result);
};

export default {
  register: ctrlWrapper(registerUser),
  login: ctrlWrapper(loginUser),
};
