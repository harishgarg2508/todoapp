import { Module } from '@nestjs/common';
import { AssignedTaskService } from './assigned-task.service';
import { AssignedTaskController } from './assigned-task.controller';
import { AssignedTaskRepository } from 'src/repository/assignedTask.repository';
import { UserRepository } from 'src/repository/user.repository';
import { TaskRepository } from 'src/repository/task.repository';

@Module({
  controllers: [AssignedTaskController],
  providers: [AssignedTaskService, AssignedTaskRepository,UserRepository,TaskRepository],
})
export class AssignedTaskModule {}
