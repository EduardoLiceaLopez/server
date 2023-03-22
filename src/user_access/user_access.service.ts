import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateUserAccessInput } from './dto/create-user_access.input';
import { UpdateUserAccessInput } from './dto/update-user_access.input';
import { UserAccess } from './entities/user_access.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { BadRequestException } from '@nestjs/common/exceptions';
import { LoginUserAccessInput } from './dto/login-userAccess.input';


@Injectable()
export class UserAccessService {

    //Inyección de repositorio y servicio
    constructor(
      @InjectRepository(UserAccess)
      private userAccessRepository: Repository<UserAccess>,

      private usersService: UsersService,
      private readonly authService: AuthService,
      ){};

  //Funciones
  /*createUserAccess(createUserAccessInput: CreateUserAccessInput): Promise<UserAccess> {
    const newUserAccess = this.userAccessRepository.create(createUserAccessInput);
    return this.userAccessRepository.save(newUserAccess) ;
  };
  */

  async createUserAccess(createUserAccessInput: CreateUserAccessInput): Promise<UserAccess>{
    const saltOrRounds = 10;
    const password = createUserAccessInput.password;
    createUserAccessInput.password = await bcrypt.hash(password, saltOrRounds);
    const newuser =  this.userAccessRepository.create(createUserAccessInput);
    return this.userAccessRepository.save(newuser);
  };

  async findAll(): Promise<UserAccess[]> {

    const usersAccess = await this.userAccessRepository.find()

    if (usersAccess){
      return usersAccess;
    }else{
      throw new NotFoundException(`Users not found`);

    }
    
  };

  //Encontrar por el user_name
  async findOneByuser_name(user_name: string): Promise<UserAccess>{
     
    const userAccess = await this.userAccessRepository.findOne({
      where:{
        user_name,
      }
    });
    if (userAccess){
      return userAccess;
    } else{

      throw new NotFoundException(`User Access with user_name '${user_name}' not found`);
    }
  };

  async findOne(id: number): Promise<UserAccess> {

    const userAccess = await this.userAccessRepository.findOne({
      where:{
        id,
      }
    });

    if (userAccess){

      return userAccess;
    } else {

      throw new NotFoundException(`User with ID ${id} not found`);
    }

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


  async loginUser(loginUserAccessInput: LoginUserAccessInput){
    const userAccess = await this.authService.validateUser(
      loginUserAccessInput.user_name,
      loginUserAccessInput.password,
    );
    if(!userAccess){
      throw new BadRequestException(`User name or password are invalid`);
    } else {
      return this.authService.generateUserAccessCredentials(userAccess);
      
    }
  }


}
