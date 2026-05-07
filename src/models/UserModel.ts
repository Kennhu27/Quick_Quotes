import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';

const userRepository = AppDataSource.getRepository(User);

async function getAllUsers(): Promise<User[]> {
  return userRepository.find();
}

async function getUserById(userId: string): Promise<User | null> {
  return userRepository.findOne({ where: { userId } });
}

async function addUser(name: string, email: string, passwordHash: string): Promise<User> {
  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  // userId is generated automatically by @BeforeInsert

  return userRepository.save(newUser);
}

async function getUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOne({ where: { email } });
}

async function login(
  name: string,
  email: string,
  password: string,
  passwordHash: string,
): Promise<User> {
  const user = getUserByEmail(email);
  (await user).name = name;
  (await user).email = email;
  (await user).password = password;
  (await user).passwordHash = passwordHash;

  return user;
}

export { addUser, getAllUsers, getUserByEmail, getUserById, login };
