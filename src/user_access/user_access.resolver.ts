import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserAccessService } from './user_access.service';
import { UserAccess } from './entities/user_access.entity';
import { CreateUserAccessInput } from './dto/create-user_access.input';
import { UpdateUserAccessInput } from './dto/update-user_access.input';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Resolver(() => UserAccess)
export class UserAccessResolver {
  
  //Inyección de repositorio y servicio
  constructor(
    @InjectRepository(UserAccess)
    private userAccessRepository: Repository<UserAccess>,

    private userAccessService: UserAccessService,
    ){};

    //Funciones
    


  }
