import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignedTaskService } from './assigned-task.service';
import { CreateAssignedTaskDto } from './dto/create-assigned-task.dto';
import { UpdateAssignedTaskDto } from './dto/update-assigned-task.dto';

@Controller('assigned-task')
export class AssignedTaskController {
  constructor(private readonly assignedTaskService: AssignedTaskService) {}

  @Post()
  assignTask(@Body() createAssignedTaskDto: CreateAssignedTaskDto) {
    return this.assignedTaskService.assignTask(createAssignedTaskDto);
  }

  @Get()
  findAll() {
    return this.assignedTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignedTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignedTaskDto: UpdateAssignedTaskDto) {
    return this.assignedTaskService.update(+id, updateAssignedTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignedTaskService.remove(+id);
  }
}
