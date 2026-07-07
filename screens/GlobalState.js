import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  starCount: 0,
  game1Fruit: '',
  registered: false,
  userId: '',
  docUserId: '',
  gamesCompleted: 0,
  profileLoaded: false,
  gender: 0,
  glasses: false,
  partyHat: false,
  shirtColor: 'green',
  skinTone: 'mediumDark',
};
const { useGlobalState } = createGlobalState(initialState);

export { initialState, useGlobalState };
