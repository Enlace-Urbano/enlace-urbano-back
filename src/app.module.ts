import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { LoginController } from './auth/login.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://enlace-urbano:factoriaf5@enlace-urbano.etjivkc.mongodb.net/enlace-urbano'
    ),
    UsersModule,
    WorkersModule
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, AuthService],
})
export class AppModule { }
