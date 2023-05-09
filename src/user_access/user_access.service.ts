import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserAccessInput } from './dto/create-user_access.input';
import { UpdateUserAccessInput } from './dto/update-user_access.input';
import { UserAccess } from './entities/user_access.entity';


@Injectable()
export class UserAccessService {
  
    //Inyección de repositorio y servicio
    constructor(
      @InjectRepository(UserAccess)
      private userAccessRepository: Repository<UserAccess>,

      private usersService: UsersService,
      
      ){};

  //Funciones
  async createUserAccess(createUserAccessInput: CreateUserAccessInput): Promise<UserAccess> {
    const userId = createUserAccessInput.user_id;
    const newUserAccess = await this.userAccessRepository.findOneBy({user_id: userId})

    if (newUserAccess){

       this.userAccessRepository.create(createUserAccessInput);
       return this.userAccessRepository.save(newUserAccess) ;
    } else{
      throw new NotFoundException('No one user asociated whit this ID')
    }



    
  };

  async findAll(): Promise<UserAccess[]> {
    const usersAccess = await this.userAccessRepository.find()
    if (usersAccess){
      return usersAccess;
    }else{
      throw new NotFoundException(`Users not found`);
    }
  };

  async findOne(user_name: string): Promise<UserAccess| undefined> {
    return this.userAccessRepository.findOneBy({user_name})
    };

  async update(user_id: number, updateUserAccess: UpdateUserAccessInput){
    const userAccess = await this.userAccessRepository.findOne({
      where: {
        user_id,
      }
    })
    if (userAccess){
      await this.userAccessRepository.update(user_id, updateUserAccess);
      return this.userAccessRepository.findOneBy({user_id: user_id});
    } else {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
  };

  async remove(user_id: number): Promise<boolean> {
    const userAccess = await this.userAccessRepository.findOne({
      where:{
        user_id,
      }
    })
    if (userAccess){

      const result = await this.userAccessRepository.delete(user_id);
      return result.affected !==0;
    }else{
      throw new NotFoundException(`User with ID ${user_id} not found`)
    };
  };


  //Conexión
  async getUser(user_id: number){
    return this.usersService.findUserById(user_id);
  };


}
