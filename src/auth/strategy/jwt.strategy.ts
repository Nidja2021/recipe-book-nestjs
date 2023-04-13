import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Request} from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.JwtExtract])
        });
    }

    private static JwtExtract(req: Request): string | null {
        const header = req.headers.authorization
        let token: string = ""
        if (header) {
            token = header.split(" ")[1]
        }
        return token
    }
}