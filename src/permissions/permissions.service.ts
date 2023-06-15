import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {

  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ){}

  create(createPermissionInput: CreatePermissionInput) {
    const permission =  this.permissionRepository.create(createPermissionInput);
    return this.permissionRepository.save(permission);
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return this.permissionRepository.findOneBy({id: id});
  }

  findOneByAction(action: string){
    const actionEx = this.permissionRepository.findOneBy({action: action}); 
    
    if( actionEx ){
      return actionEx;
    } else {
      throw new ConflictException(`The ${action} action could not be found. Please make sure you have entered a valid action name and try again.`);
    }
  }

  update(id: number, updatePermissionInput: UpdatePermissionInput) {
    const permission = this.permissionRepository.update(id, updatePermissionInput);
    return permission;
  }

  //Esta deberá funcionar???
  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
