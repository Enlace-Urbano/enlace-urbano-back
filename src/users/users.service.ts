/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EncryptService } from 'src/tools/encrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private encryptService: EncryptService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();
    if (existingUser) {
      throw new ConflictException('Este nombre de usuario ya existe');
    }

    const hashPassword = await this.encryptService.encrypt(
      createUserDto.password,
    );
    createUserDto.password = hashPassword;
    return this.userModel.create(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUser(username: string): Promise<User> {
    return this.userModel.findOne({ username }).lean();
  }

  async update(username: string, newUser: UpdateUserDto) {
    try {
      const user = await this.userModel.findOne({ username });
      if (user != null) {
        const updateuser = Object.assign(user, newUser);
        return this.userModel.findOneAndUpdate({ username }, newUser, {
          new: true,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    return this.userModel.remove({ id });
  }
}
