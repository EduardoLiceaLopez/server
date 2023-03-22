import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAccessService } from 'src/user_access/user_access.service';
import * as bcrypt from 'bcrypt';
import { UserAccess } from 'src/user_access/entities/user_access.entity';


@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(()=> UserAccessService))
        private userAccessService: UserAccessService,
        private jtwTokenService: JwtService,
    ){};

    async validateUser(user_name:string, password: string): Promise<any>{

        const userAccess = await this.userAccessService.findOneByuser_name(user_name);
        if(userAccess){
            if (await bcrypt.compare(password, userAccess.password)){
                delete userAccess.password;
                return userAccess;
            }
        }
        return null;
    };

    async generateUserAccessCredentials(userAccess: UserAccess){
        const playload = {
            user_name: userAccess.user_name,
            user_role: userAccess.user_role,
            user_id: userAccess.user_id,
            password: userAccess.password,
            //user: userAccess.user,
        };
        return {
            access_token: this.jtwTokenService.sign(playload),
        }
    }



}
