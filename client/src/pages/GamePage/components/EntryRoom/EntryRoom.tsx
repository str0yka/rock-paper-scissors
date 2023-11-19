import { useState } from 'react';

import { Button, Input } from '~/components/common';

interface EntryRoomProps {
  onConnect: (username: string) => void;
}

export const EntryRoom: React.FC<EntryRoomProps> = ({ onConnect }) => {
  const [username, setUsername] = useState('');

  return (
    <form
      className="flex max-w-sm flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        onConnect(username);
      }}
    >
      <div className="flex-grow">
        <Input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          maxLength={30}
        />
      </div>
      <Button type="submit">Connect</Button>
    </form>
  );
};
