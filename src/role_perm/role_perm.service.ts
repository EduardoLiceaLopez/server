import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolePermInput } from './dto/create-role_perm.input';
import { UpdateRolePermInput } from './dto/update-role_perm.input';
import { RolePerm } from './entities/role_perm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { find } from 'rxjs';

@Injectable()
export class RolePermService {

  constructor(
    @InjectRepository(RolePerm)
    private rolePermRepository: Repository<RolePerm>,


    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private permRepository: Repository<Permission>
  ){}

  create(createRolePermInput: CreateRolePermInput) {
    const role_perm = this.rolePermRepository.create(createRolePermInput);
    return this.rolePermRepository.save(role_perm);
  }

  /**
   * 
   * Inicia seccion que recupera los roles y los permisos
   */

  //Recupera al permiso
  async getPermission(permission_id: number): Promise<any>{
    const permission_pre = await this.permRepository.findOneBy({id: permission_id})

    if(!permission_pre){
        return null;
    }

    const { id, ...permission } = permission_pre;
    return permission;
    //return permission;
};

//Recupera al role
async getRole(role_id: number): Promise<any>{
  const role = await this.roleRepository.findOneBy({id: role_id})
  if(!role){
      return null;
  }
  return role;
};
  //Fin de la seccion de recuperacion de entidades

  findAll() {
    return this.rolePermRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} rolePerm`;
  }

  async findOneByRoleId(id: number) {
    const roles = await this.rolePermRepository.find({where: {role_id: id}});

    if (roles){

      return roles;

    } else {
      
      throw new ConflictException('No roles_perm for this user');
    }
  }


  async update(role_id: number, perm_id: number,  updateRolePermInput: UpdateRolePermInput) {
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
}
