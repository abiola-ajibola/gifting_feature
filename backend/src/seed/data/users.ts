import { hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/user/dtos/user.dto';

export const users: CreateUserDto[] = [
  {
    username: 'user1',
    email: 'user1@example.com',
    firstname: 'User',
    lastname: 'One',
    password: hashSync('1qA?kdnf', 10),
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    firstname: 'User',
    lastname: 'Two',
    password: hashSync('1qA?kdnf', 10),
  },
  {
    username: 'user3',
    email: 'user3@example.com',
    firstname: 'User',
    lastname: 'Three',
    password: hashSync('1qA?kdnf', 10),
  },
  {
    username: 'user4',
    email: 'user4@example.com',
    firstname: 'User',
    lastname: 'Four',
    password: hashSync('1qA?kdnf', 10),
  },
  {
    username: 'user5',
    email: 'user5@example.com',
    firstname: 'User',
    lastname: 'Five',
    password: hashSync('1qA?kdnf', 10),
  },
];
