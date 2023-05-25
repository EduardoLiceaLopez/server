import { Injectable } from '@nestjs/common';
import { CreateRolePermInput } from './dto/create-role_perm.input';
import { UpdateRolePermInput } from './dto/update-role_perm.input';

@Injectable()
export class RolePermService {
  create(createRolePermInput: CreateRolePermInput) {
    return 'This action adds a new rolePerm';
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
