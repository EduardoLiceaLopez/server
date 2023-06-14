import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class RolesService {

  constructor(
        
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private permRepository: Repository<Role>,
  ){
  }


  create(createRoleInput: CreateRoleInput) {
    
    const role = this.roleRepository.create(createRoleInput);

    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOneBy({id: id});
  }

  async update(id: number, updateRoleInput: UpdateRoleInput) {
    
    const role = await this.roleRepository.update(id, updateRoleInput);
    
    if (!role){
      throw new NotFoundException(`There is not a role with ID ${id}`);
    }
  
    return role;
  }

  remove(id: number) {
       const role_tem = this.roleRepository.findOneBy({id: id});

       
  }

  /**
   * 
   *   async update(role_id: number, perm_id: number,  updateRolePermInput: UpdateRolePermInput) {
    const up_role_perm = await this.rolePermRepository.update({role_id: role_id, permission_id:perm_id}, updateRolePermInput);
    if (up_role_perm.affected == 0){
      throw new NotFoundException('Sorry, there is not a roles_permition with this attributes');
    }

    const role_perm = await this.rolePermRepository.findOne({where:{
      role_id: role_id,
      permission_id: perm_id
    }});

    console.log(up_role_perm);
    //return up_role_perm;

    return role_perm;
  }

  async remove(role_id: number, perm_id: number) {

    const role_perm = await this.rolePermRepository.findOne({where:{
      role_id: role_id,
      permission_id: perm_id
    }});

    const role_perm_s = JSON.stringify(role_perm); 

    const de_role_perm = await this.rolePermRepository.delete({role_id: role_id, permission_id: perm_id});

    if (de_role_perm.affected == 0){
      throw new NotFoundException('Sorry, there is not a roles_permition with this attributes');

    }else{
      return role_perm_s + " Ha sido eliminado el objeto anterior";
    }

  } 
   */


  async getPermission(permission_id: number): Promise<any>{
    const permission = await this.permRepository.findOneBy({id: permission_id})

    if(!permission){
        return null;
    }
    return permission;
};
}
