import { Injectable } from '@nestjs/common';
import { CreateUserRoleInput } from './dto/create-user_role.input';
import { UpdateUserRoleInput } from './dto/update-user_role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UserRoleService {

  constructor(
        
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ){}

  create(createUserRoleInput: CreateUserRoleInput) {
    
    const user_role = this.userRoleRepository.create(createUserRoleInput);
    return this.userRoleRepository.save(user_role);    
  }

  //Recupera al usuario
  async getUser(user_id: number): Promise<any>{

    const user = await this.userRepository.findOneBy({id: user_id})

    if(!user){
        return null;
    }
    return user;
};

//Recupera al role
async getRole(role_id: number): Promise<any>{

  const role = await this.roleRepository.findOneBy({id: role_id})

  if(!role){
      return null;
  }
  return role;
};
//Fin de los servicios que recuperan las entidades asociadas

  findAll() {
    return `This action returns all userRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRole`;
  }

  update(id: number, updateUserRoleInput: UpdateUserRoleInput) {
    return `This action updates a #${id} userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }
}
