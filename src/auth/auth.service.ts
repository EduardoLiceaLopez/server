import { Injectable } from '@nestjs/common';
import { UserAccess } from 'src/user_access/entities/user_access.entity';
import { UserAccessService } from 'src/user_access/user_access.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userAccessService: UserAccessService,
            private jwtService: JwtService,
        ){}

    async validateUserAccess(user_name: string, password: string): Promise <any>{

        const userAccess = await this.userAccessService.findOne(user_name);
        if(userAccess && userAccess.password === password){
            const {password, ...result} = userAccess;
            return result;

        }
            return null;
    }

    async login(userAccess: UserAccess){
       //No hace falta const userAccess = await this.userAccessService.findOne(loginUserInput.user_name);
        return {
            access_token: this.jwtService.sign({user_name: userAccess.user_name, sub: userAccess.id}),
            userAccess,
        };

    }

}
