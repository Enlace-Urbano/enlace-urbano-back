import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type WorkerDocument = Worker & Document
@Schema()
export class Worker {
    @Prop()
    name: string;

    @Prop()
    role: string;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker)