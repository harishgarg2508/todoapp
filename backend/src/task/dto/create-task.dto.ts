import { IsString, IsNotEmpty, IsDateString, ValidateNested, IsArray, IsInt, } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

}
