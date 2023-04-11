import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            usernameField: 'user_name',
            passwordField: 'password',
        });
    }

    async validate(user_name: string, password: string): Promise<any>{
        const userAccess = await this.authService.validateUserAccess(user_name, password);

        if(userAccess){   
            return userAccess;
        }else {
            throw new UnauthorizedException();
        } 
    } 

}