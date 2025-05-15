import { AVAILABLE_ROUTES } from '../constants/index.js';

export const rootController = (req, res) => {
  res.json(AVAILABLE_ROUTES);
};
