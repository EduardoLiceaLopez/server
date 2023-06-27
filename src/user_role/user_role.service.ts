import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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



  findOneByUserId(user_id: number){

    const user_role = this.userRoleRepository.findOneBy({user_id: user_id});

    if(!user_role){
      throw new ConflictException('No user_role whit this user_id');
    }

    return user_role;
  };

  findAll() {
    return this.userRoleRepository.find();
  };

  findOne(id: number) {
    return `This action returns a #${id} userRole`;
  }


  async update(user_id: number, role_id: number,   updateUserRoleInput: UpdateUserRoleInput) {
    const up_user_role = await this.userRoleRepository.update({role_id: role_id, user_id: user_id}, updateUserRoleInput);
    if (up_user_role.affected == 0){

      throw new NotFoundException('Sorry, there is not a user_role with this attributes');
    }

    const user_role = await this.userRoleRepository.findOne({where:{
      role_id: role_id,
      user_id: user_id
    }});

    console.log(up_user_role);
    //return up_role_perm;

    return user_role;
  }


  async remove(role_id: number, user_id: number) {

    const user_role = await this.userRoleRepository.findOne({where:{
      role_id: role_id,
      user_id: user_id
    }});

    const user_role_s = JSON.stringify(user_role); 

    const de_user_role = await this.userRoleRepository.delete({role_id: role_id, user_id: user_id});

    if (de_user_role.affected == 0){
      throw new NotFoundException('Sorry, there is not a users_role with this attributes');

    }else{
      return user_role_s + " Ha sido eliminado el objeto anterior";
    }

  }
}
