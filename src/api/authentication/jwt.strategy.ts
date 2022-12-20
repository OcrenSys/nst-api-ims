import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import dayjs from 'dayjs';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.SECRET_JWT
        })
    }

    async validate(payload: any) {
        if(dayjs().isAfter(payload.exp)){
            return { userId: payload.sub, username: payload.username }
        }
        return null;
    }
}