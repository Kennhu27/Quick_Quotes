import argon2 from 'argon2';
import { Request, Response } from 'express';
import { addUser, getAllUsers, getUserById, login } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { LoginSchema, RegistrationSchema } from '../validators/authValidator.js';

export async function getUsers(req: Request, res: Response): Promise<void> {
  const users = await getAllUsers();
  res.json({ users });
}

export async function getUser(req: Request, res: Response): Promise<void> {
  const { userId } = req.params;
  const user = await getUserById(userId as string);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ user });
}

export async function registerUser(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { name, email, password } = result.data;

  try {
    const passwordHash = await argon2.hash(password);
    const newUser = await addUser(name, email, passwordHash);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const result = LoginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password, passwordHash } = result.data;

  try {
    const loginMatch = await argon2.verify(passwordHash, password);
    if (loginMatch) {
      const user = await login(email, password, passwordHash);
      console.log(user);
      await req.session.clearSession();

      req.session.authenticatedUser = {
        userId: user.userId,
        email: user.email,
        displayName: user.name,
      };
      req.session.isLoggedIn = true;
      res.sendStatus(200);
    } else {
      res.status(403).json(result.error);
      return;
    }
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}
