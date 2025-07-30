import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from 'src/repository/task.repository';
import { AssignedTaskRepository } from 'src/repository/assignedTask.repository';

@Injectable()
export class TaskService {

  constructor(private readonly taskRepository:TaskRepository,
    private readonly assignedTaskRepository: AssignedTaskRepository
  ) {}
  async createTask(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
    
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({id});
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id,updateTaskDto);
  }

  deleteById(id: number) {
    return this.taskRepository.delete(id);
  }
}
