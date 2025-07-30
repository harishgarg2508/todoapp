import { Controller, Get, Post, Body, Patch, Param, Delete,Query, Req, UseGuards, } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { AuthGuard } from '../gaurds/auth.gaurd';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: { id: string };
}

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService,) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body() createTaskDto: CreateTaskDto) {
    const userId = req.user.id;
    return this.taskService.createTask(createTaskDto,+userId);
  }
  @Get()
  getAllTasks(@Req() req: RequestWithUser, @Query() query: TaskFilterDto) {
    const userId = req.user.id;
    const { page = 1, ...filters } = query;
    return this.taskService.getAllTasks(+userId, filters, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.taskService.deleteById(+id);
  }
}
