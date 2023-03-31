import { Query, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guard';
import { UserAccess } from 'src/user_access/entities/user_access.entity';
import { CreateUserAccessInput } from 'src/user_access/dto/create-user_access.input';

@Resolver()
export class AuthResolver {

    constructor(private authService: AuthService){}

    @UseGuards(GqlAuthGuard)
    @Mutation(()=> LoginResponse, {nullable: true})
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context){
        
        return this.authService.login(context.user);
    }   
    
/*
    @Mutation(()=> UserAccess)
    signup(@Args('loginUserInput') loginUserInput: LoginUserInput){
        return this.authService.signup(loginUserInput)
    }

    */

    @Mutation(()=> UserAccess)
    signup(@Args('loginUserInput') signupUserInput: CreateUserAccessInput){
        return this.authService.signup(signupUserInput)
    }
}
