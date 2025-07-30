import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class TaskFilterDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  creatorId?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  assigneeId?: number;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page?: number = 1;
}
