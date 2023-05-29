import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectModel.create(createProjectDto);
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  findOne(title: string) {
    return this.projectModel.findOne({ title });
  }

  async update(title: string, newProject: UpdateProjectDto) {
    try {
      const project = await this.projectModel.findOne({ title });
      console.log(project);
      if (project != null) {
        const updateProject = Object.assign(project, newProject);
        return this.projectModel.findOneAndUpdate({ title }, updateProject, {
          new: true,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  remove(title: string) {
    console.log({ title });
    return this.projectModel.remove({ title });
  }
}
