import { UserToAuth } from 'src/user/interfaces/user.interface';

export class AuthUserDTO implements UserToAuth {
  email: string;
  password: string;
}
