import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';


//Esta entidad reune un rool y le asocia varios permisos
//Así como si estan activos o no
@Entity('roles_perm')
@ObjectType()
export class RolePerm {


  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  

  //Para conectar con Permission
  @Column()
  @Field(() => Int)
  permission_id: number;

  @ManyToOne(()=> Permission, permissions => permissions.role_perm)
  @JoinColumn({name: 'permission_id'})
  permission: Permission;

  //Para conectar con Roles

  @Field(()=> Int)
  @Column()
  role_id: number;

  @ManyToOne(()=> Role, role => role.role_perm)
  @JoinColumn({name: 'role_id'})
  role: Role;

  //Indica si está activo el persmiso del role
  //Por default dejaremos activos todos los perm
  @Field(()=> Boolean)
  @Column({default: true})
  active: Boolean;

}
