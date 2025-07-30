import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignedTaskDto } from './dto/create-assigned-task.dto';
import { UpdateAssignedTaskDto } from './dto/update-assigned-task.dto';
import { AssignedTaskRepository } from 'src/repository/assignedTask.repository';
import { TaskRepository } from 'src/repository/task.repository';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class AssignedTaskService {
  constructor(private readonly assignedTaskRepository: AssignedTaskRepository,
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository
  ) {}
  async assignTask(createAssignedTaskDto: CreateAssignedTaskDto) {
    const {taskId,userId}= createAssignedTaskDto;
    const user  = await this.userRepository.findOneBy({id:userId});
    if(!user){
      throw new NotFoundException('User not found');
    } 
    const task = await this.taskRepository.findOneBy({id:taskId});
    if(!task){
      throw new NotFoundException('Task not found');
    }

    return this.assignedTaskRepository.createAssignedTask(user, task);
  }

  async markAsCompleted(id: number) {
    const assignedTask = await this.assignedTaskRepository.findOneBy({ id });
    if (!assignedTask) {
      throw new NotFoundException('Assigned task not found');
    }
    return this.assignedTaskRepository.markAsCompleted(assignedTask);
  }


  findAll() {
    return `This action returns all assignedTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignedTask`;
  }

  update(id: number, updateAssignedTaskDto: UpdateAssignedTaskDto) {
    return `This action updates a #${id} assignedTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignedTask`;
  }
}
