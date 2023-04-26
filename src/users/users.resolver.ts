import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from 'src/user_types/entities/user_type.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserTypesService } from 'src/user_types/user_types.service';
import { AdminGuard } from 'src/Roles/admin.guard';
import { User_adminGuard } from 'src/Roles/user-admin.guard';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Resolver((of) => User)

export class UsersResolver {

    constructor(private usersService: UsersService,
              
        private userTypesService: UserTypesService,
      ){}

    //Indica a GraphQL que será para recuperar datos
    //Mostrar los datos de un usuario
    @UseGuards(User_adminGuard)
    @Query((returns)=> [User])
    users(){
        return this.usersService.finAll();
    }

    @UseGuards(User_adminGuard)
    @Query((returns) => User)
    user(@Args('id', {type: () => Int}) id : number){
        return this.usersService.findUserById(id);
    }

  

    @UseGuards(User_adminGuard)
    @ResolveField((returns) => UserType)
    async  userType(@Parent() user: User): Promise<any>{
      const userType = await this.usersService.getUserType(user.user_type_id);
        //return this.usersService.getUserType(user.user_type_id)
        if (!userType){
        
        /*  return{
            id: parseInt('0', 10),
            name: 'Not Avalible user_type for this user',
            users: [],
          };
        */
        return { message: 'Not user type for this user' };
        }

        return userType;
    };
    
   


    //Indica a GraphQl que tomará datos
    /*
    @Mutation((returns) => User)
    createUser(@Args('userInput') userInput: CreateUserInput){

        return this.usersService.createUser(userInput);
    }

    */
    @UseGuards(User_adminGuard)
    @Mutation((returns) => User)
    async createUser(@Args('userInput') userInput: CreateUserInput){

        const userTypes = await  this.userTypesService.findOne(userInput.user_type_id);

        if (userTypes){

          return  this.usersService.createUser(userInput);

        } else{

          throw new NotFoundException(`Error, couldn't associate this new user with the user type ${userInput.user_type_id} because it doesn't exist`);
        }
      


    }



  @UseGuards(AdminGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput.id, updateUserInput);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Boolean)
     removeUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }
  


}
