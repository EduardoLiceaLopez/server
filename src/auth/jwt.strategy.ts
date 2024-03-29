import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){

        super({

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hide-me',
            sessionStorage: true,

        });
    }

    async validate(payload: any){
        return {
            user_id: payload.sub, user_name: payload.user_name, user_role: payload.user_role,
        };
    }
}
