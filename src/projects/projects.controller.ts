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
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @UseGuards(LocalAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 2 * 1024 * 1024 } }))
  async create(@Body() createProjectDto: CreateProjectDto, @UploadedFile() image: Express.Multer.File) {
    createProjectDto.image = image.buffer;
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll() {
    const projects = await this.projectsService.findAll();
    return projects.map(project => {
      const { title, description } = project;
      return { title, description };
    });
  }


  @UseGuards(LocalAuthGuard)
  @Patch(':title')
  async update(
    @Param('title') title: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(title, updateProjectDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':title')
  async remove(@Param('title') title: string) {
    return this.projectsService.remove(title);
  }

  @Get(':title/image')
  async getImage(@Param('title') title: string, @Res() res: Response) {
    const project = await this.projectsService.findOne(title);
    res.set('Content-Type', 'image/png');
    res.send(project.image);
  }
}