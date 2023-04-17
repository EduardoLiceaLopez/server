import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserTypeInput } from './dto/create-user_type.input';
import { UpdateUserTypeInput } from './dto/update-user_type.input';
import { UserType } from './entities/user_type.entity';

@Injectable()
export class UserTypesService {

  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
    
    @InjectRepository(User)
    private userRepository: Repository<User>,

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

    async updateUserType(id: number, updateUserTypeInput: UpdateUserTypeInput){


      const userType = await this.userTypeRepository.findOne({
        where:{id,}
      })
      if (userType){
        await this.userTypeRepository.update(id, updateUserTypeInput);
        return this.userTypeRepository.findOne({
          where:{id}
        })
      
      }else{
        throw new NotFoundException (`User_Type with ID ${id} not found`);
      }
    };

    //Borrar 
    async deleteUserType(id: number): Promise<boolean>{

      const userType = await this.userTypeRepository.findOne({
        where: {id}
      });

      if (userType){
        const user_id = userType.users;
        await this.userTypeRepository.delete(id);
        await this.userRepository
              .createQueryBuilder()
              .delete()
              .where("id = :user_id", {user_id})
              .execute();
        return true;
    
      }else{
        throw new NotFoundException (`User_Type with ID ${id} not found`);
      }
    };
    

    /*
    async deleteUserType(id: number): Promise<boolean>{
      const userType = await this.userTypeRepository.findOne({
        where: {id,}
      })
      if (userType){

        const result = await this.userTypeRepository.delete(id);
        return result.affected !== 0;
      }else{
        throw new NotFoundException (`User with ID ${id} not found`);
      }
    }
    */

}
