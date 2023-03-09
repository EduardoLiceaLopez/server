import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserType } from 'src/user_types/entities/user_type.entity';
import { UserTypesService } from 'src/user_types/user_types.service';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userReposiroty: Repository<User>,

        private usersTypeService: UserTypesService,

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

    //Conexión con servicio de UserType para encontrar el el typo
    //de usuario desde user
    getUserType(user_type_id: number): Promise<UserType>{
        return this.usersTypeService.findOne(user_type_id)
    }

}
