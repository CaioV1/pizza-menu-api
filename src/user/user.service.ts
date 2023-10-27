import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Injectable } from '@nestjs/common';

import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import EncryptionUtil from 'src/utils/encryption.util';
import { UserToResponse } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async insertOne(createUser: CreateUserDto): Promise<User> {
    const userAlreadyInserted = await this.userModel.findOne({
      email: createUser.email,
    });

    if (userAlreadyInserted) {
      throw new ConflictException(
        new Error('Já existe esse e-mail cadastrado'),
      );
    }

    const salt = EncryptionUtil.getSalt();
    const createdUser = new this.userModel({
      ...createUser,
      salt,
      password: EncryptionUtil.getHash(createUser.password, salt),
    });
    return createdUser.save();
  }

  findAll(): Promise<Array<UserToResponse>> {
    return this.userModel
      .find()
      .select(['_id', 'name', 'email', 'address'])
      .exec();
  }

  async updateOne(updateUserDto: UpdateUserDto): Promise<UserToResponse> {
    const updatedUser: UserToResponse = await this.userModel
      .findByIdAndUpdate(updateUserDto._id, updateUserDto)
      .select(['_id', 'name', 'email', 'address'])
      .exec();

    return updatedUser;
  }

  deleteOne(userId: string): Promise<User> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
