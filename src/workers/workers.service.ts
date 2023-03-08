/* eslint-disable prettier/prettier */
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

  findOne(name: string) {
    return this.workerModel.findOne({ name });
  }

  async update(_id: string, newWorker: UpdateWorkerDto) {
    try {const worker = await this.findOne(_id)
      if (worker!=null){
        const updateWorker = Object.assign(worker,newWorker)
        return this.workerModel.findOneAndUpdate({_id}, updateWorker, {new:true})
      }
      else{
        throw new Error()
      }
    } catch (error) {
      console.log(error)
    };
  }

  remove(name: string) {
    return this.workerModel.remove({ name });
  }
}
