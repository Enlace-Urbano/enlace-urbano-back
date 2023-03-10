/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';


@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) { }

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workersService.findAll();
  }

  @Get(':id')
  findOne(@Param('name') name: string) {
    return this.workersService.findOne(name);
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateWorkerDto: UpdateWorkerDto) { return this.workersService.update(name, updateWorkerDto) }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.workersService.remove(name);
  }
}
