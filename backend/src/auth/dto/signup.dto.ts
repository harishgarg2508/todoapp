
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, Min, min } from "class-validator"

export class SignUpDto {


    @IsString()
    name:string

    @IsOptional()
    @IsString()
    email: string

    @IsString()
    @Min(3, { message: "must be atleast 3 character long" })
    password: string

}