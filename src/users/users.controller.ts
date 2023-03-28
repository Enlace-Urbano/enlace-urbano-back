import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(LocalAuthGuard)
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(LocalAuthGuard)
  @Get(':username')
  findUser(@Param('username') username: string) {
    return this.usersService.findUser(username);
  }

  @UseGuards(LocalAuthGuard)
  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.update(username, UpdateUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
