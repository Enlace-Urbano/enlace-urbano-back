import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import {} from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStatisticDto: CreateStatisticDto) {
    return this.statisticsService.create(createStatisticDto);
  }

  @Get()
  findAll() {
    return this.statisticsService.findAll();
  }

  @Get(':register')
  findStatistic(@Param('register') register: string) {
    return this.statisticsService.findOne(register);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':register')
  update(
    @Param('register') register: string,
    @Body() UpdateStatisticDto: UpdateStatisticDto,
  ) {
    return this.statisticsService.update(register, UpdateStatisticDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':register')
  remove(@Param('register') register: string) {
    return this.statisticsService.remove(register);
  }
}
