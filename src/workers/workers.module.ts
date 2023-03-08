import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Worker, WorkerSchema } from './schemas/worker.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Worker.name,
        schema: WorkerSchema
      }
    ]),
  ],
  controllers: [WorkersController],
  providers: [WorkersService]
})
export class WorkersModule { }
