import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://enlace-urbano:factoriaf5@enlace-urbano.etjivkc.mongodb.net/?retryWrites=true&w=majority'
    ),
    UsersModule,
    WorkersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
