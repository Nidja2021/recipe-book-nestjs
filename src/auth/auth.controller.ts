import {BadRequestException, Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthRegisterDto} from "./dto/authregister.dto";
import {AuthLoginDto} from "./dto/authLogin.dto";
import {TokenResponseDto} from "./dto/tokenResponse.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    public register(@Body() authRegisterDto: AuthRegisterDto): Promise<{ message: string }> {
        try {
            return this.authService.register(authRegisterDto)
        } catch (e: any) {
            throw new HttpException("Something is wrong", HttpStatus.BAD_REQUEST)
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public login(@Body() authLoginDto: AuthLoginDto): Promise<TokenResponseDto> {
        try {
            return this.authService.login(authLoginDto)
        } catch (e: any) {
            throw new HttpException("Something is wrong", HttpStatus.BAD_REQUEST)
        }
    }
}
