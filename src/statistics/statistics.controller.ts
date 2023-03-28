import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  
  @Post()
  create(@Body() createStatisticDto: CreateStatisticDto) {
    return this.statisticsService.create(createStatisticDto);
  }
  @Get()
  findAll() {
    return this.statisticsService.findAll();
  }

  @Get(':register')
  findUser(@Param('register') register: string) {
    return this.statisticsService.findUser(register);
  }

  @Patch(':register')
  update(
    @Param('register') register: string,
    @Body() UpdateUserDto: UpdateUserDto) {
    return this.statisticsService.update(register, UpdateUserDto)
  }


  @Delete(':register')
  remove(@Param('register') register: string) {
    return this.statisticsService.remove(register);
  }
}