import { register } from '../services/auth-service.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const registerUser = async (req, res) => {
  const result = await register(req.body);
  res.status(result.status).json(result);
};

export default {
  register: ctrlWrapper(registerUser)
};