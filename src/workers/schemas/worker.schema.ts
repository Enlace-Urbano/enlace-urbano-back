import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WorkerDocument = Worker & Document;

@Schema()
export class Worker {
  @Prop()
  name: string;

  @Prop()
  role: string;

  @Prop()
  profession: string;


  @Prop({
    type: Buffer,
    required: true,
    validate: {
      validator: function (value) {
        return value.length <= 2097152;
      },
      message: 'La imagen debe ser menor a 2 MB',
    },
  })
  image: Buffer;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
