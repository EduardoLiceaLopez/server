import { Injectable } from '@nestjs/common';
import { CreateUsersAccessInput } from './dto/create-users_access.input';
import { UpdateUsersAccessInput } from './dto/update-users_access.input';

@Injectable()
export class UsersAccessService {
  create(createUsersAccessInput: CreateUsersAccessInput) {
    return 'This action adds a new usersAccess';
  }

  findAll() {
    return `This action returns all usersAccess`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersAccess`;
  }

  update(id: number, updateUsersAccessInput: UpdateUsersAccessInput) {
    return `This action updates a #${id} usersAccess`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersAccess`;
  }
}
