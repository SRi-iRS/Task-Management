import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';


@Module({
  imports: [TasksModule],
  controllers : [AppController]
})
export class AppModule {}