import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker, WorkerDocument } from './schemas/worker.schema';
import { Model } from 'mongoose';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Worker.name)
    private readonly workerModel: Model<WorkerDocument>,
  ) {}

  create(createWorkerDto: CreateWorkerDto) {
    return this.workerModel.create(createWorkerDto);
  }

  async findAll(): Promise<Worker[]> {
    return this.workerModel.find().exec();
  }

  findOne(name: string) {
    return this.workerModel.findOne({ name });
  }

  async update(name: string, newWorker: UpdateWorkerDto) {
    try {
      const worker = await this.workerModel.findOne({ name });
      console.log(worker);
      if (worker != null) {
        const updateWorker = Object.assign(worker, newWorker);
        return this.workerModel.findOneAndUpdate({ name }, updateWorker, {
          new: true,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  remove(name: string) {
    console.log({ name });
    return this.workerModel.remove({ name });
  }
}
