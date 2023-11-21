import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from 'src/user/schemas/user.schema';
import { AuthUserDTO } from './dto/auth-user.dto';
import EncryptionUtil from 'src/utils/encryption.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async authLogin(authUserDTO: AuthUserDTO): Promise<string> {
    const user = await this.userModel
      .findOne({ email: authUserDTO.email })
      .exec();

    if (!user) {
      throw new UnauthorizedException(
        'E-mail ou senha incorreto. Por favor tente novamente.',
      );
    }

    const hashPassword = EncryptionUtil.getHash(
      authUserDTO.password,
      user.salt,
    );

    if (hashPassword != user.password) {
      throw new UnauthorizedException(
        'E-mail ou senha incorreto. Por favor tente novamente.',
      );
    }

    const token = await this.jwtService.signAsync({
      sub: user._id.toString(),
      username: user.email,
    });

    return token;
  }
}
