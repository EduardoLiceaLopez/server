import { Injectable } from '@nestjs/common';
import { CreateRolePermInput } from './dto/create-role_perm.input';
import { UpdateRolePermInput } from './dto/update-role_perm.input';
import { RolePerm } from './entities/role_perm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermService {

  constructor(
    @InjectRepository(RolePerm)
    private rolePermRepository: Repository<RolePerm>,
  ){}

  create(createRolePermInput: CreateRolePermInput) {
    const role_perm = this.rolePermRepository.create(createRolePermInput);
    return this.rolePermRepository.save(role_perm);
  }

  findAll() {
    return `This action returns all rolePerm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolePerm`;
  }

  update(id: number, updateRolePermInput: UpdateRolePermInput) {
    return `This action updates a #${id} rolePerm`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolePerm`;
  }
}
