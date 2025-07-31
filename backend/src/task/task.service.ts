import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from 'src/repository/task.repository';
import { AssignedTaskRepository } from 'src/repository/assignedTask.repository';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class TaskService {

  constructor(private readonly taskRepository:TaskRepository,
    private readonly assignedTaskRepository: AssignedTaskRepository,
    private readonly userRepository: UserRepository
  ) {}
  async createTask(createTaskDto: CreateTaskDto, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return this.taskRepository.createTask(createTaskDto, user);
  }

  getAllTasks(userId: number, filters: any = {}, page: number = 1) {
    return this.taskRepository.getAllTasks(userId, filters, page);
  }

  async updateTask(id: number, updateTaskDto: Partial<CreateTaskDto>) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return this.taskRepository.update(id, updateTaskDto);
  }
  
  findTaskById(id: number) {
    return this.taskRepository.findTaskById(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id,updateTaskDto);
  }

  deleteById(id: number) {
    return this.taskRepository.delete(id);
  }
}
