
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min, min } from "class-validator"

export class SignUpDto {


    @IsString()
    name:string

    @IsOptional()
    @IsString()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

}