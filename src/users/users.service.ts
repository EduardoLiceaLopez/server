import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userReposiroty: Repository<User>,

    ){};


    /**
     * 
     * 
     * @returns  una repositorio de una entidad (tabla en mysql)
     * Muestra todos los usuarios
     */
    async finAll(): Promise<User[]> {

       return this.userReposiroty.find()
    }
    /**
     * 
     * 
     */

    async finUserById(id : number): Promise<User>{
        return  this.userReposiroty.findOne({
            where: {
                id,
            }

        });
    }

    /**
     * 
     * 
     */
    createUser(users: CreateUserInput): Promise<User>{
        const newUser = this.userReposiroty.create(users);
        return this.userReposiroty.save(users);
        
    }

}
