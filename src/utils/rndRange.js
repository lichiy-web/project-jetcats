import { isDefined } from './isDefined.js';

export const rndRange = function (p1, p2) {
  const [min, max] = isDefined(p2) ? [p1, p2] : [0, p1];
  return Math.abs(Math.round(min + Math.random() * (max - min + 1) - 0.5));
};
