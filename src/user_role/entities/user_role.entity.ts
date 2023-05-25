import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


/**
 * 
 * Esta entidad sirve como tabla union para 
 */
@Entity('user_roles')
@ObjectType()
export class UserRole {

  @Column()
  @Field(()=> Int)
  user_id: number;

  @Column()
  @Field(()=> Int)
  role_id: number;


  //LLaves foraneas
}
