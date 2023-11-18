import { CHOICES } from '../constants/choices.js';

export const getWinner = (firstPlayer, secondPlayer) => {
  if (firstPlayer.choice === CHOICES.ROCK && secondPlayer.choice === CHOICES.ROCK) return 'DRAW';
  if (firstPlayer.choice === CHOICES.PAPER && secondPlayer.choice === CHOICES.PAPER) return 'DRAW';
  if (firstPlayer.choice === CHOICES.SCISSORS && secondPlayer.choice === CHOICES.SCISSORS) return 'DRAW';
  if (firstPlayer.choice === CHOICES.ROCK && secondPlayer.choice === CHOICES.SCISSORS) return firstPlayer;
  if (firstPlayer.choice === CHOICES.SCISSORS && secondPlayer.choice === CHOICES.PAPER) return firstPlayer;
  if (firstPlayer.choice === CHOICES.PAPER && secondPlayer.choice === CHOICES.ROCK) return firstPlayer;
  if (secondPlayer.choice === CHOICES.ROCK && firstPlayer.choice === CHOICES.SCISSORS) return secondPlayer;
  if (secondPlayer.choice === CHOICES.SCISSORS && firstPlayer.choice === CHOICES.PAPER) return secondPlayer;
  if (secondPlayer.choice === CHOICES.PAPER && firstPlayer.choice === CHOICES.ROCK) return secondPlayer;
};
