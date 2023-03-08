import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker, WorkerDocument } from './schemas/worker.schema'
import { Model } from 'mongoose';


@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Worker.name)
    private readonly workerModel: Model<WorkerDocument>,
  ) { }

  create(createWorkerDto: CreateWorkerDto) {
    return this.workerModel.create(createWorkerDto);
  }

  findAll(): Promise<Worker[]> {
    return this.workerModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} worker`;
  }

  update(id: number, updateWorkerDto: UpdateWorkerDto) {
    return `This action updates a #${id} worker`;
  }

  remove(name: string) {
    return this.workerModel.remove({ name });
  }
}
