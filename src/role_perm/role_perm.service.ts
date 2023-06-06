import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRolePermInput } from './dto/create-role_perm.input';
import { UpdateRolePermInput } from './dto/update-role_perm.input';
import { RolePerm } from './entities/role_perm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

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
    const permission = await this.permRepository.findOneBy({id: permission_id})

    if(!permission){
        return null;
    }
    return permission;
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
      console.log(roles);
      return roles;
    } else {
      throw new ConflictException('No sale');
    }
  }


  update(id: number, updateRolePermInput: UpdateRolePermInput) {
    return `This action updates a #${id} rolePerm`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolePerm`;
  }
}
