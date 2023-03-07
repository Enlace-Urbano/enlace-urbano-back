import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WorkersModule } from './workers/workers.module';

@Module({
  imports: [UsersModule, WorkersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
