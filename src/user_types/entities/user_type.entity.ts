import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_types')
@ObjectType()
export class UserType {

  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name:string;

  @OneToMany(() => User, (user) => user.user_type)
  @Field(() => [User])
  users: User[];//CAMBIO PE
}
