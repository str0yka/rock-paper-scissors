import { CHOICE } from '../constants/choice.js';

export const getWinner = (firstPlayer, secondPlayer) => {
  if (firstPlayer.choice === CHOICE.ROCK && secondPlayer.choice === CHOICE.ROCK) return 'DRAW';
  if (firstPlayer.choice === CHOICE.PAPER && secondPlayer.choice === CHOICE.PAPER) return 'DRAW';
  if (firstPlayer.choice === CHOICE.SCISSORS && secondPlayer.choice === CHOICE.SCISSORS) return 'DRAW';
  if (firstPlayer.choice === CHOICE.ROCK && secondPlayer.choice === CHOICE.SCISSORS) return firstPlayer;
  if (firstPlayer.choice === CHOICE.SCISSORS && secondPlayer.choice === CHOICE.PAPER) return firstPlayer;
  if (firstPlayer.choice === CHOICE.PAPER && secondPlayer.choice === CHOICE.ROCK) return firstPlayer;
  if (secondPlayer.choice === CHOICE.ROCK && firstPlayer.choice === CHOICE.SCISSORS) return secondPlayer;
  if (secondPlayer.choice === CHOICE.SCISSORS && firstPlayer.choice === CHOICE.PAPER) return secondPlayer;
  if (secondPlayer.choice === CHOICE.PAPER && firstPlayer.choice === CHOICE.ROCK) return secondPlayer;
};
