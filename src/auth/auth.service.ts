import { ConflictException, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { UserAccess } from 'src/user_access/entities/user_access.entity';
import { UserAccessService } from 'src/user_access/user_access.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserAccessInput } from 'src/user_access/dto/create-user_access.input';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from 'src/user_role/entities/user_role.entity';
import { RolePerm } from 'src/role_perm/entities/role_perm.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RolePermService } from 'src/role_perm/role_perm.service';
import { RolesService } from 'src/roles/roles.service';
import { Observable, throwError } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { sign } from 'jsonwebtoken';




@Injectable()
export class AuthService {

    constructor(private userAccessService: UserAccessService,
            private jwtService: JwtService,

            @InjectRepository(User)
            private userRepository: Repository<User>,

            @InjectRepository(UserRole)
            private userRoleRepository: Repository<UserRole>,

            @InjectRepository(RolePerm)
            private rolesPermissionRepository: Repository<RolePerm>,


            @InjectRepository(Permission)
            private permissionRepository: Repository<Permission>,

            @InjectRepository(Role)
            private roleRepository: Repository<Role>,


            private rolePermService : RolePermService,

            private roleService : RolesService,

        ){}

    async validateUserAccess(user_name: string, password: string): Promise <any>{

        const userAccess = await this.userAccessService.findOne(user_name);

        if(userAccess){
            
            const valid = await bcrypt.compare(password, userAccess?.password);

            if(userAccess && valid){
                const {password, ...result} = userAccess;
                return result;
            }
                return null;
        } else{
            
            throw new NotFoundException(`The user_name not exist`);
        }


    }

    async login(userAccess: UserAccess){

        const user_roles = await this.userRoleRepository.findOne({
            where:{user_id: userAccess.user_id}
        });

        if (!user_roles){

           return {
            access_token: this.jwtService.sign({
                user_name: userAccess.user_name,
                sub: userAccess.user_id,
                role: userAccess.user_role,
            }),
            userAccess,
            
            }
        }

        console.log(user_roles);
        //Ocupo un servicio de rolePerm
        //RolePerm es la entidad que une roles con permisos
        const rolePermission = await this.rolePermService.findOneByRoleId(user_roles.role_id);

        console.log(rolePermission);
        
        return {
            access_token: this.jwtService.sign({
                user_name: userAccess.user_name,
                sub: userAccess.user_id,
                role: userAccess.user_role,
            }),
            userAccess,
            rolePermission,
        };
    }

    async newUserAccess(signupUserInput: CreateUserAccessInput){

        //recomendar buscar por username o id? algo que sea unico (UNIQUE)
        const userAccess = await this.userAccessService.findOne(signupUserInput.user_name);

        if (userAccess){
            
            throw new ConflictException('User Acces already exists!');
        }
        const password = await bcrypt.hash(signupUserInput.password, 10);
        
        return this.userAccessService.createUserAccess({
            ...signupUserInput,
            password,
        });
    }

        //Permite cerrar sesion actual, creando un token con los mismos datos pero ya expirado
    async logOut(context){

        const token = await context.req.headers.authorization.replace('Bearer ', '');
        const decoded_token = await this.jwtService.decode(token);

        console.log(decoded_token);

        if (typeof decoded_token === 'object') {
 
            const { exp, ...payload } = decoded_token; // Extraemos la propiedad `exp` del payload

            console.log(payload);

            const newToken = sign(payload, 'hide-me', { expiresIn: '1s' }); // Nuevo token con expiración de 1 segundo
        
            console.log(newToken);
            return newToken;

          } else{

            throw new ConflictException(`Logout could not be completed due to a conflict with your current session's access tokes`);
          }

   
    }

}
