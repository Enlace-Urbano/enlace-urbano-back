import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  create(createuserDto: CreateUserDto) {
    return this.userModel.create(createuserDto);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUser(id: string): Promise<User> {
    return this.userModel.findOne({ id });
  }

  async update(id: string, newuser: UpdateUserDto) {
    try {
      const user = await this.findUser(id)
      if (user != null) {
        const updateuser = Object.assign(user, newuser);
        return this.userModel.findOneAndUpdate({ id }, newuser, { new: true });
      }
      else {
        throw new Error()
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  async remove(id: number) {
    return this.userModel.remove({ id });
  }
}