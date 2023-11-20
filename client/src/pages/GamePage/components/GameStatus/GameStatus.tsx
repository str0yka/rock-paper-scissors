import { useIntl } from '~/features/intl';

interface GameStatusProps {
  firstPlayer: Player;
  secondPlayer?: Player;
  user: User;
  winner: Room['winner'];
}

export const GameStatus: React.FC<GameStatusProps> = ({
  user,
  firstPlayer,
  secondPlayer,
  winner,
}) => {
  const intl = useIntl();

  const getStatus = () => {
    if (winner) {
      if (winner === 'DRAW') return intl.t('pages.game.status.draw');
      if (winner.id === user.id) return intl.t('pages.game.status.youWin');
      if (user.role === 'player') return intl.t('pages.game.status.youLose');
      return intl.t('pages.game.status.somebodyWin');
    }

    if (!secondPlayer) return intl.t('pages.game.status.waitSecondPlayer');
    if (user.role === 'spectator') return intl.t('pages.game.status.waitPlayersChooseSpectator');
    if (!secondPlayer.choice && !firstPlayer.choice)
      return intl.t('pages.game.status.waitPlayersChoose');
    if (!secondPlayer.choice) return intl.t('pages.game.status.waitSecondPlayerChoose');
    if (!firstPlayer.choice) return intl.t('pages.game.status.waitFirstPlayerChoose');

    return '(❁´◡`❁)';
  };

  return <p className="text-xl font-semibold dark:text-neutral-50">{getStatus()}</p>;
};
