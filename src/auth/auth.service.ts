import { Injectable } from '@nestjs/common';
import { UserAccess } from 'src/user_access/entities/user_access.entity';
import { UserAccessService } from 'src/user_access/user_access.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {

    constructor(private userAccessService: UserAccessService){}

    async validateUserAccess(user_name: string, password: string): Promise <any>{

        const userAccess = await this.userAccessService.findOne(user_name);
        if(userAccess && userAccess.password === password){
            const {password, ...result} = userAccess;
            return result;

        }
            return null;
    }

    async login(userAccess: UserAccess){
       // const userAccess = await this.userAccessService.findOne(loginUserInput.user_name);
        const {password, ...result} = userAccess;

        return {
            access_token: 'jwt',
            userAccess: result,
        };

    }

}
