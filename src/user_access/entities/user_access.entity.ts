import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_access')
@ObjectType()
export class UserAccess {
 
  @PrimaryColumn()
  @Field(()=> Int)
  user_id: number;

  @ManyToOne(() => User, (user) => user.user_access)
  @JoinColumn({name: 'user_id'})
  @Field(()=> User, {nullable: true})
  user?: User;


  @Column()
  @Field(()=> String)
  user_name: string;

  //sasajsasa
  @Column()
  password: string;

  @Column()
  @Field()
  user_role: string;
}
