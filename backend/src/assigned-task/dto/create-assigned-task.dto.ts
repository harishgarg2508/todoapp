import { IsNumber, IsNotEmpty, IsPositive } from "class-validator"

export class CreateAssignedTaskDto {

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    taskId: number
}
