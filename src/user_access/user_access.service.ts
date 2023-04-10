import { Injectable, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { FindOneOptions, Repository } from 'typeorm';
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
  createUserAccess(createUserAccessInput: CreateUserAccessInput): Promise<UserAccess> {
    const newUserAccess = this.userAccessRepository.create(createUserAccessInput);
    return this.userAccessRepository.save(newUserAccess) ;

    console.log(newUserAccess);
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

  async update(id: number, updateUserAccess: UpdateUserAccessInput){

    const userAccess = await this.userAccessRepository.findOne({
      where: {
        id,
      }
    })

    if (userAccess){
      await this.userAccessRepository.update(id, updateUserAccess);
      return this.userAccessRepository.findOneBy({id:id});

    } else {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  };

  async remove(id: number): Promise<boolean> {
    const userAccess = await this.userAccessRepository.findOne({
      where:{
        id,
      }
    })
    if (userAccess){

      const result = await this.userAccessRepository.delete(id);
      return result.affected !==0;
    }else{
      throw new NotFoundException(`User with ID ${id} not found`)
    };
  };


  //Conexión
  getUser(user_id: number): Promise<User>{
    return this.usersService.finUserById(user_id);
  };


}
