import { useState } from 'react';

import { Button, Input } from '~/components/common';
import { useIntl } from '~/features/intl';

interface EntryRoomProps {
  onConnect: (username: string) => void;
}

export const EntryRoom: React.FC<EntryRoomProps> = ({ onConnect }) => {
  const intl = useIntl();
  const [username, setUsername] = useState('');

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        onConnect(username);
      }}
    >
      <div className="min-w-sm flex-grow">
        <Input
          type="text"
          placeholder={intl.t('input.label.yourName')}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          maxLength={30}
        />
      </div>
      <Button type="submit">{intl.t('button.connect', { user: 'Игорь' })}</Button>
    </form>
  );
};
