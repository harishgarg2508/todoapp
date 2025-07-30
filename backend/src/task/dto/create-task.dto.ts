import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}
