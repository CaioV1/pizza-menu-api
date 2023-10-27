import { UserToCreate } from '../interfaces/user.interface';

export default class CreateUserDto implements UserToCreate {
  name: string;
  email: string;
  password: string;
  address: string;
}
