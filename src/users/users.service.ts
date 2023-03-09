/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
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

   async findUser(username: string): Promise<User> {
     return this.userModel.findOne({ username });
   }

  async update(username: string, newUser: UpdateUserDto) {
    try {
      const user = await this.userModel.findOne({username})
      if (user != null) {
       const updateuser = Object.assign(user, newUser);
        return this.userModel.findOneAndUpdate({ username }, newUser, { new: true });
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