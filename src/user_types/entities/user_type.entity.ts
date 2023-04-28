import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_types')
@ObjectType()
export class UserType {

  @PrimaryGeneratedColumn()
  @Field(type => Int, {nullable: true})
  id: number;

  @Column()
  @Field({nullable: true})
  name:string;

  @OneToMany(() => User, (user) => user.user_type)
  @Field(() => [User], {nullable: true})
  users: User[];//CAMBIO PE
}
