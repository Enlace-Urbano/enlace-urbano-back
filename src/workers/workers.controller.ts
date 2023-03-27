/* eslint-disable prettier/prettier */
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
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('workers')
@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}
  
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 2 * 1024 * 1024} }))
  async create(@Body() createWorkerDto: CreateWorkerDto, @UploadedFile() image: Express.Multer.File) {
    createWorkerDto.image = image.buffer;
    return this.workersService.create(createWorkerDto);
  }
  
  @Get()
  async findAll() {
    const workers = await this.workersService.findAll();
    return workers.map(worker => {
      const { name, role } = worker;
      return { name, role };
    });
  }
  
  @Get(':name')
  async findOne(@Param('name') name: string) {
    const worker = await this.workersService.findOne(name);
    const { role } = worker;
    return { name, role };
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ) {
    return this.workersService.update(name, updateWorkerDto);
  }

  @Delete(':name')
  async remove(@Param('name') name: string) {
    return this.workersService.remove(name);
  }

  @Get(':name/image')
  async getImage(@Param('name') name: string, @Res() res: Response) {
    const worker = await this.workersService.findOne(name);
    res.set('Content-Type', 'image/png');
    res.send(worker.image);
  }
}