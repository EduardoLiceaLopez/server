import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Esta entidad sirve como tabla union para 
 * Asigna a un usuario sus roles
 */
@Entity('users_role')
@ObjectType()
export class UserRole {

  ///Une con usuarios
  @Field(()=> Int)
  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => User, user => user.user_role)
  @JoinColumn({ name: 'user_id' })
  @Field(()=> User)
  user: User;

  //Da sus respectivos roless
  @Field(()=> Int)
  @PrimaryColumn()
  role_id: number;

  @ManyToOne(()=> Role, role => role.user_role)
  @JoinColumn({name: 'role_id'})
  @Field(()=> Role)
  role: Role;
  //LLaves foraneas
}
