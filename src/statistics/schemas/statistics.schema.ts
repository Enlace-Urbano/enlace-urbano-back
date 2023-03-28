import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StatisticDocument = Statistic & Document;

@Schema()
export class Statistic {
  @Prop()
  register: string;

  @Prop()
  value: number;


}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
