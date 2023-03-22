import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserAccessService } from './user_access.service';
import { UserAccess } from './entities/user_access.entity';
import { CreateUserAccessInput } from './dto/create-user_access.input';
import { UpdateUserAccessInput } from './dto/update-user_access.input';
import { Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { LoggedUserAccessOutput } from './dto/logged-userAccess.output';
import { LoginUserAccessInput } from './dto/login-userAccess.input';

@Resolver(() => UserAccess)
export class UserAccessResolver {
  
  //Inyección de repositorio y servicio
  constructor(

    private userAccessService: UserAccessService,
    ){};

    //Funciones

    @Query((returns)=> [UserAccess])
    usersAccess(){
      return this.userAccessService.findAll();
    };

    @Query((returns)=> UserAccess)
    userAccess(@Args('id', {type: () => Int}) id: number){
      return this.userAccessService.findOne(id);
    };

    //encontrar por el user_name
    @Query((returns)=> UserAccess)
    userAccesByUserName(@Args('user_name', {type: () => String}) user_name: string){
      return this.userAccessService.findOneByuser_name(user_name);
    };


    @Mutation((returns) => UserAccess)
    createUserAccess(@Args('userAccessInput') userAccessInput: CreateUserAccessInput){

      return this.userAccessService.createUserAccess(userAccessInput);
    };

    @Mutation(()=> UserAccess)
    updateUserAccess(@Args('updateUserAccess') updateUserAccess: UpdateUserAccessInput){
      return this.userAccessService.update(updateUserAccess.id, updateUserAccess);
    };
    
    @Mutation(()=> Boolean)
    removeUserAccess(@Args('id', {type: () => Int}) id: number): Promise<boolean>{

      return this.userAccessService.remove(id);
    };

    @ResolveField((returns)=> User)
    async user(@Parent() userAccess: UserAccess): Promise<User>{
    const user = await this.userAccessService.getUser(userAccess.user_id);
      if (!user){
        throw new NotFoundException;
      }else{

        return user;
      }

    };


    @Mutation(()=> LoggedUserAccessOutput)
    loginUserAccess(@Args('loginUserAccessInput') LoginUserAccessInput: LoginUserAccessInput){
      return this.userAccessService.loginUser(LoginUserAccessInput);
    }

  }
