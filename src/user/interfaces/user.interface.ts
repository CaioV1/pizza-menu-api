import { Types } from 'mongoose';

export default interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  salt: string;
  address: string;
}

export type UserToCreate = Omit<User, '_id' | 'salt'>;
export type UserToResponse = Omit<User, 'password' | 'salt'>;
export type UserToUpdate = Omit<User, 'email' | 'password' | 'salt'>;
export type UserToAuth = Pick<User, 'email' | 'password'>;
