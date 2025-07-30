import { IsNumber, IsNotEmpty, IsPositive, IsBoolean } from "class-validator"

export class CreateAssignedTaskDto {

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    taskId: number

    @IsNotEmpty()
    @IsBoolean()
    isCompleted: boolean
}
