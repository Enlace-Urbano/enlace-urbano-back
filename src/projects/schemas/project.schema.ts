import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: Buffer,
    required: true,
    validate: {
      validator: function (value) {
        return value.length <= 2097152;
      },
      message: 'La imagen debe ser menor a 2 PMB',
    },
  })
  image: Buffer;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
