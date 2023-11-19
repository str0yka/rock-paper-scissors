export const SERVER_MESSAGE_EVENT = {
  PUT_USER: 'PUT_USER',
  PATCH_USER: 'PATCH_USER',
  PUT_ROOM: 'PUT_ROOM',
  PATCH_ROOM: 'PATCH_ROOM',
} as const;

export const CLIENT_MESSAGE_EVENT = {
  RESTART: 'RESTART',
  CHOICE: 'CHOICE',
};
