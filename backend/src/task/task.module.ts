import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from 'src/repository/task.repository';
import { AssignedTaskRepository } from 'src/repository/assignedTask.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository,AssignedTaskRepository],
})
export class TaskModule {}
