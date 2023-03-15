import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  
      private userAccessService: UserAccessService,
      ){};

  //Funciones
  createUserAccess(createUserAccessInput: CreateUserAccessInput): Promise<UserAccess> {
    const newUserAccess = this.userAccessRepository.create(createUserAccessInput);
    return this.userAccessRepository.save(createUserAccessInput) ;
  };

  async findAll(): Promise<UserAccess[]> {
    return this.userAccessRepository.find();
  };

  findOnes(id: number): Promise<UserAccess> {
    return this.userAccessRepository.findOne({
      where:{
        id,
      }
    });
  };

  update(id: number, updateUserAccessInput: UpdateUserAccessInput) {
    return `This action updates a #${id} userAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAccess`;
  }
}
