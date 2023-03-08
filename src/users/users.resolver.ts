import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {

    constructor(private usersService: UsersService){}

    //Indica a GraphQL que será para recuperar datos
    //Mostrar los datos de un usuario
    @Query((returns)=> [User])
    users(){
        return this.usersService.finAll();
    }

    //Indica a GraphQl que tomará datos
    @Mutation((returns) => User)
    createUser(@Args('userInput') userInput: CreateUserInput){
        return this.usersService.createUser(userInput);

    }


}
