import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class AuthLoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter a valid email." })
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}