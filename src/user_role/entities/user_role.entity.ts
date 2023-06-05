import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Esta entidad sirve como tabla union para 
 * Asigna a un usuario sus roles
 */
@Entity('user_roles')
@ObjectType()
export class UserRole {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  ///Une con usuarios
  @Column()
  @Field(()=> Int)
  user_id: number;

  @ManyToOne(() => User, user => user.user_role)
  @JoinColumn({ name: 'user_id' })
  @Field(()=> User)
  user: User;

  //Da sus respectivos roles
  @Column()
  @Field(()=> Int)
  role_id: number;

  @ManyToOne(()=> Role, role => role.user_role)
  @JoinColumn({name: 'role_id'})
  @Field(()=> Role)
  role: Role;


  //LLaves foraneas
}
