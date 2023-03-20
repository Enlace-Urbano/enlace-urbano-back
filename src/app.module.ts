import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EncryptService } from './tools/encrypt.service';
import { ToolsModule } from './tools/tools.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    UsersModule,
    WorkersModule,
    AuthModule,
    ToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
