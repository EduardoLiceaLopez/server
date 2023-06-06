import { Injectable } from '@nestjs/common';
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

  update(id: number, updateRoleInput: UpdateRoleInput) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  async getPermission(permission_id: number): Promise<any>{
    const permission = await this.permRepository.findOneBy({id: permission_id})

    if(!permission){
        return null;
    }
    return permission;
};
}
