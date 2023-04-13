import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {PrismaService} from "../../prisma/prisma.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector,
                private prismaService: PrismaService,
                private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        const request = context.switchToHttp().getRequest()

        if (request.headers.authorization) {
            const decodedToken = await this.jwtService.decode(request.headers.authorization.split(" ")[1])
            const user = await this.prismaService.user.findUnique({ where: { email: decodedToken["email"] }})

            return roles.includes(user.roles)
        }
        return false;
    }

}