import { ACTIONS } from "./newTypes";

export const openNew = () => {
  return {
    type: ACTIONS.OPEN_NEW,
  };
};

export const closeNew = () => {
  return {
    type: ACTIONS.CLOSE_NEW,
  };
};
