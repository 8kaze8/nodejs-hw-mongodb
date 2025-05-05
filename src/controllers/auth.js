import { register } from '../services/auth-service.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { login as loginService } from '../services/auth-service.js';
import { refresh as refreshService } from '../services/auth-service.js';
import { logout as logoutService } from '../services/auth-service.js';

const registerUser = async (req, res) => {
  const result = await register(req.body);
  res.status(result.status).json(result);
};

const loginUser = async (req, res) => {
  const result = await loginService(req.body, res);
  res.status(result.status).json(result);
};

const refreshSession = async (req, res) => {
  const result = await refreshService(req, res);
  res.status(result.status).json(result);
};

const logoutUser = async (req, res) => {
  await logoutService(req, res);
  res.status(204).send();
};

export default {
  register: ctrlWrapper(registerUser),
  login: ctrlWrapper(loginUser),
  refresh: ctrlWrapper(refreshSession),
  logout: ctrlWrapper(logoutUser),
};
