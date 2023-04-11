import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UserAccessService } from './user_access.service';
import { UserAccess } from './entities/user_access.entity';
import { CreateUserAccessInput } from './dto/create-user_access.input';
import { UpdateUserAccessInput } from './dto/update-user_access.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


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

    

    @Query((returns)=> UserAccess, {name: 'userAccess'})
    findOne(@Args('user_name') user_name: string){
      return this.userAccessService.findOne(user_name);
    };



    //Protegido con un guardia, requiere el token de acceso
    @Query(()=> [UserAccess], {name: 'usersAccess'})
    @UseGuards(JwtAuthGuard)
    findAll(@Context() context){
      return this.userAccessService.findAll();
  
    }



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
    async user(@Parent() userAccess: UserAccess): Promise<any>{
    const user = await this.userAccessService.getUser(userAccess.user_id);
      if (!user){

        throw new NotFoundException('User not found for this user_access');

      }else{

        return user;
      }

    }


    /**
     * 
     */

  }
