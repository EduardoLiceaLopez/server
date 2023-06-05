import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RolePerm } from 'src/role_perm/entities/role_perm.entity';
import { UserRole } from 'src/user_role/entities/user_role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
@ObjectType()
export class Role {
  
  @PrimaryGeneratedColumn()
  @Field(() => Int )
  id: number;

  @Column()
  @Field(()=> String)
  name: string;

  @Column()
  @Field(()=> String)
  description: string;


  //OJO AQUI TENGO DUDAS DE SI ES CORRECTO LO QUE PUSE
  //Aqui es la conexcion con user_role
  @OneToMany(()=> UserRole, (userRole)=> userRole.role)
  @Field(()=> [UserRole])
  user_role: UserRole[];


  @Field(()=> [RolePerm])
  role_perm: [RolePerm]

}
