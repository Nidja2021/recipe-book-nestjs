import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

export class AuthRegisterDto {
    @IsNotEmpty()
    @IsString()
    firstname: string

    @IsNotEmpty()
    @IsString()
    lastname: string

    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter a valid email." })
    email: string

    @IsNotEmpty()
    @Length(3, 20, { message: "Password should be between 3 and 20 chars." })
    password: string
}