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
  const newUser = userRepository.create({ name, email, passwordHash });
  return userRepository.save(newUser);
}

async function updateUserEmail(userId: string, newEmail: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userId } });

  if (!user) {
    return null;
  }

  user.email = newEmail;
  return userRepository.save(user);
}

async function deleteUserById(userId: string): Promise<void> {
  const user = await userRepository.findOne({ where: { userId } });

  if (!user) {
    return;
  }

  await userRepository.remove(user);
}

async function getUsersByVerifiedStatus(isVerified: boolean): Promise<User[]> {
  return userRepository.find({ where: { verifiedEmail: isVerified } });
}

export {
  getAllUsers,
  getUserById,
  addUser,
  updateUserEmail,
  deleteUserById,
  getUsersByVerifiedStatus,
};
//make changes that are nessecery
