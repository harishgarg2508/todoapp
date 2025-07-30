import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignedTaskDto } from './create-assigned-task.dto';

export class UpdateAssignedTaskDto extends PartialType(CreateAssignedTaskDto) {}
