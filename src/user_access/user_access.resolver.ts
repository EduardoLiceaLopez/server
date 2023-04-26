import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UserAccessService } from './user_access.service';
import { UserAccess } from './entities/user_access.entity';
import { CreateUserAccessInput } from './dto/create-user_access.input';
import { UpdateUserAccessInput } from './dto/update-user_access.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from 'src/Roles/admin.guard';
import { UserGuard } from 'src/Roles/user.guard';
import { User_adminGuard } from 'src/Roles/user-admin.guard';


@Resolver(() => UserAccess)
export class UserAccessResolver {
  
  //Inyección de repositorio y servicio
  constructor(

    private userAccessService: UserAccessService,
    ){};

    //Funciones
    @UseGuards(AdminGuard)
    @Query((returns)=> [UserAccess])
    usersAccess(){
      return this.userAccessService.findAll();
    };
//  
    @UseGuards(User_adminGuard)
    @UseGuards(UserGuard)
    @Query((returns)=> UserAccess, {name: 'userAccess'})
    async findOne(@Args('user_name') user_name: string){

      const userAccess = await this.userAccessService.findOne(user_name);

      if (userAccess){
        return userAccess;
      } else {
        throw new NotFoundException(`User with username '${user_name}' not fuound`);
      }
    };



    //Protegido con un guardia, requiere el token de acceso
    @Query(()=> [UserAccess], {name: 'usersAccess'})
    @UseGuards(AdminGuard)
    findAll(){
      return this.userAccessService.findAll();
  
    }

    @UseGuards(AdminGuard)
    @Mutation((returns) => UserAccess)
    createUserAccess(@Args('userAccessInput') userAccessInput: CreateUserAccessInput){

      return this.userAccessService.createUserAccess(userAccessInput);
    };

    @UseGuards(AdminGuard)
    @Mutation(()=> UserAccess)
    updateUserAccess(@Args('updateUserAccess') updateUserAccess: UpdateUserAccessInput){
      return this.userAccessService.update(updateUserAccess.id, updateUserAccess);
    };
    
    @UseGuards(AdminGuard)
    @Mutation(()=> Boolean)
    removeUserAccess(@Args('id', {type: () => Int}) id: number): Promise<boolean>{

      return this.userAccessService.remove(id);
    };

    
    @ResolveField((returns)=> User)
    async user(@Parent() userAccess: UserAccess){
    const user = await this.userAccessService.getUser(userAccess.user_id);
    
      if (user){

        return user;

      }else{

        throw new NotFoundException('User not found for this user_access');
      }

    }


    /**
     * 
     */

  }
