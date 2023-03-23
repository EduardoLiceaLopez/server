import { Injectable } from '@nestjs/common';
import { UserAccessService } from 'src/user_access/user_access.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {

    constructor(private userAccessService: UserAccessService){}

    async validateUserAccess(user_name: string, password: string){

        const userAccess = await this.userAccessService.findOneByUserName(user_name);

        if(userAccess && userAccess.password === password){
            const {password, ...result} = userAccess;
            return userAccess;
        }else{

            return null;
        }
    };

    async login(loginUserInput: LoginUserInput){
        const userAccess = await this.userAccessService.findOneByUserName(loginUserInput.user_name);
        const {password, ...result} = userAccess;

        return {
            acces_token: 'jwt',
            userAccess,
        };

    }

}
