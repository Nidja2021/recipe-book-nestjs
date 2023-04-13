import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {AuthRegisterDto} from "./dto/authregister.dto";
import * as bcrypt from 'bcrypt'
import {AuthLoginDto} from "./dto/authLogin.dto";
import {secret_key} from "../utils/utils";
import {TokenResponseDto} from "./dto/tokenResponse.dto";



@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

    async register(authRegisterDto: AuthRegisterDto): Promise<{ message: string }> {
        const { firstname, lastname, email, password } = authRegisterDto

        const userCount = await this.prismaService.user.count({ where: { email }})

        if (userCount) throw new BadRequestException("User already exists.")

        await this.prismaService.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: await this.hashPassword(password)
            }
        })
        return { message: "User is successfully registered." }
    }

    async login(authLoginDto: AuthLoginDto): Promise<TokenResponseDto> {
        const { email, password } = authLoginDto

        const userCount = await this.prismaService.user.findUnique({ where: { email }})

        if (!userCount) throw new BadRequestException("Bad credentials.")

        if (!await this.comparePassword(password, userCount.password)) {
            throw new BadRequestException("Bad credentials.")
        }

        const access_token = await this.generateToken({ email })

        const tokenResponseDto = new TokenResponseDto(access_token)

        return tokenResponseDto
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hashSync(password, 12)
    }

    private async comparePassword(password: string, hashedPassword: string) {
        return bcrypt.compareSync(password, hashedPassword)
    }

    private async generateToken(payload: { email: string }): Promise<string> {
        return await this.jwtService.signAsync(payload, { secret: secret_key, expiresIn: '1d' })
    }
}
