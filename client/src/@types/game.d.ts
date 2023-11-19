type Choice = 'PAPER' | 'ROCK' | 'SCISSORS';

interface User {
  id: string;
  username: string;
  role: 'player' | 'spectator';
  choice: Choice | null;
}

interface Player extends User {
  role: 'player';
}

interface Room {
  id: string;
  players: Player[];
  winner: null | Player | 'DRAW';
}
