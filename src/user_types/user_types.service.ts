import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersAccess } from 'src/users_access/entities/users_access.entity';
import { Repository } from 'typeorm';
import { CreateUserTypeInput } from './dto/create-user_type.input';
import { UpdateUserTypeInput } from './dto/update-user_type.input';
import { UserType } from './entities/user_type.entity';

@Injectable()
export class UserTypesService {

  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>
  ){};

  create(createUserTypeInput: CreateUserTypeInput): Promise<UserType> {
    const userType = this.userTypeRepository.create(createUserTypeInput);
    return this.userTypeRepository.save(userType);
  }

  findAll(): Promise<UserType[]> {
    return this.userTypeRepository.find();

  }

  findOne(id: number): Promise<UserType> {
    return this.userTypeRepository.findOne({
      where: {
        id,
      }
    });
  }
/*
  update(id: number, updateUserTypeInput: UpdateUserTypeInput) {
    return `This action updates a #${id} userType`;
  }

  remove(id: number) {
    return `This action removes a #${id} userType`;
  }
  */
}
