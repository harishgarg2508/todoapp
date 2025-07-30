import { IsNumber, IsNotEmpty, IsPositive, IsBoolean, IsOptional } from "class-validator"

export class CreateAssignedTaskDto {

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    taskId: number

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean
}
