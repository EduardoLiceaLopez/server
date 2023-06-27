import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UserType } from 'src/user_types/entities/user_type.entity';
import { UserTypesService } from 'src/user_types/user_types.service';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        private usersTypeService: UserTypesService,

    ){};

    async finAll(): Promise<User[]> {
       return this.userRepository.find()
    }

    async findUserById(id : number): Promise<User>{
        const user = await this.userRepository.findOne({
            where: {
                id,
            }
        })
        if (user){
            return user;
        } else{
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    };

    
    createUser(users: CreateUserInput): Promise<User>{
        const newUser = this.userRepository.create(users);
        return this.userRepository.save(newUser);//Correción
        
    }

    async getUserType(user_type_id: number): Promise<any>{

        const userType = await this.usersTypeService.findOne(user_type_id)

        if(!userType){
            return null;
        }
        return this.usersTypeService.findOne(user_type_id)
    };

    async updateUser(id: number, updateUserInput: UpdateUserInput){

        const user = await this.userRepository.findOne({
            where: {id,
            }
        })
        if(user){ 
        await this.userRepository.update(id, updateUserInput);
        return this.userRepository.findOneBy({id: id});
        } else{
            throw new NotFoundException (`User with ID ${id} not found`);
        }
      };

       async deleteUser(id: number): Promise<boolean>{
        const user = await this.userRepository.findOne({
            where:{id}
        })
        if (user){
            const result = await this.userRepository.delete(id);
            return result.affected !== 0;
        }else{
            throw new NotFoundException (`User with ID ${id} not found`);
        }
      };
}
