import {IsString} from "class-validator";

export class TokenResponseDto {
    @IsString()
    access_token: string

    constructor(access_token: string) {
        this.access_token = access_token
    }
}