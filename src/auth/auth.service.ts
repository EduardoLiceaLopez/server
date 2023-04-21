import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAccess } from 'src/user_access/entities/user_access.entity';
import { UserAccessService } from 'src/user_access/user_access.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import { CreateUserAccessInput } from 'src/user_access/dto/create-user_access.input';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';



@Injectable()
export class AuthService {

    constructor(private userAccessService: UserAccessService,
            private jwtService: JwtService,
        ){}

    async validateUserAccess(user_name: string, password: string): Promise <any>{

        const userAccess = await this.userAccessService.findOne(user_name);

        if(userAccess){
            
            const valid = await bcrypt.compare(password, userAccess?.password);

            if(userAccess && valid){
                const {password, ...result} = userAccess;
                return result;
    
            }
                return null;
        } else{
            throw new NotFoundException(`The user_name not exist`);
        }


    }

    async login(userAccess: UserAccess){
       //No hace falta const userAccess = await this.userAccessService.findOne(loginUserInput.user_name);
        return {
            access_token: this.jwtService.sign({
                user_name: userAccess.user_name,
                sub: userAccess.id,
                role: userAccess.user_role,
            }),
            userAccess,
        };
    }


/* async signup(loginUserInput: LoginUserInput){

        //recomendar buscar por username o id? algo que sea unico (UNIQUE)
        const userAccess = await this.userAccessService.findOne(loginUserInput.user_name);

        if (userAccess){
            
            throw new Error('UserAcces already exists!');
        }
        
        return this.userAccessService.createUserAccess({
            ...loginUserInput,
        });
    }
    */

    async signup(signupUserInput: CreateUserAccessInput){

        //recomendar buscar por username o id? algo que sea unico (UNIQUE)
        const userAccess = await this.userAccessService.findOne(signupUserInput.user_name);

        if (userAccess){
            
            throw new Error('User Acces already exists!');
        }

        const password = await bcrypt.hash(signupUserInput.password, 10);
        
        return this.userAccessService.createUserAccess({
            ...signupUserInput,
            password,
        });
    }
}
