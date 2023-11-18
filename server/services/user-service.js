import { v4 as uuidv4 } from 'uuid';

class UserService {
  createUser(partialUser) {
    const user = {
      id: uuidv4(),
      username: uuidv4(),
      role: 'spectator',
      choice: null,
      ...partialUser,
    };

    return user;
  }
}

export default new UserService();
