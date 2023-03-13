import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserType } from 'src/user_types/entities/user_type.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {

    constructor(private usersService: UsersService){}

    //Indica a GraphQL que será para recuperar datos
    //Mostrar los datos de un usuario
    @Query((returns)=> [User])
    users(){
        return this.usersService.finAll();
    }

    @Query((returns) => User)
    user(@Args('id', {type: () => Int}) id : number){
        return this.usersService.finUserById(id);
    }

    @ResolveField((returns) => UserType)
    userType(@Parent() user: User): Promise<UserType>{
        return this.usersService.getUserType(user.user_type_id)
    };


    //Indica a GraphQl que tomará datos
    @Mutation((returns) => User)
    createUser(@Args('userInput') userInput: CreateUserInput){
        return this.usersService.createUser(userInput);

    }



  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput.id, updateUserInput);
  }

  
  @Mutation(() => Boolean)
     removeUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }
  


}
