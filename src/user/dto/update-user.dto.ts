import { Types } from 'mongoose';
import { UserToUpdate } from '../interfaces/user.interface';

export default class UpdateUserDto implements UserToUpdate {
  _id: Types.ObjectId;
  name: string;
  address: string;
}
