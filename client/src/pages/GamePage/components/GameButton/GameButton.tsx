import { IconButton } from '~/components/common';
import { IconPaper, IconRock, IconScissors } from '~/components/common/icons';
import { CHOICE } from '~/utils/constants';

type GameButtonProps = Parameters<typeof IconButton>[0] & {
  choice: Choice;
  onChoose?: (choice: Choice) => void;
  firstPlayer?: Player;
  secondPlayer?: Player;
  winner: Room['winner'];
  showChosen?: boolean;
};

const choiceIcons = {
  [CHOICE.ROCK]: <IconRock />,
  [CHOICE.SCISSORS]: <IconScissors />,
  [CHOICE.PAPER]: <IconPaper />,
};

export const GameButton: React.FC<GameButtonProps> = ({
  choice,
  firstPlayer,
  secondPlayer,
  winner,
  showChosen,
  onChoose,
  children,
  ...props
}) => {
  const getButtonColor = (): typeof props.color => {
    if (winner && firstPlayer?.choice === choice) {
      if (winner === 'DRAW') return 'warning';
      if (winner.id === firstPlayer?.id) return 'success';
      if (winner.id === secondPlayer?.id) return 'error';
    }
    if (showChosen && firstPlayer?.choice === choice) return 'primary';
    return 'neutral';
  };

  return (
    <>
      <IconButton
        {...props}
        color={getButtonColor()}
        {...(onChoose && { onClick: () => onChoose(choice) })}
      >
        {children || choiceIcons[choice]}
      </IconButton>
    </>
  );
};
