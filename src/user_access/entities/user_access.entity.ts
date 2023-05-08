import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, } from 'typeorm';

@Entity('user_access')
@ObjectType()


export class UserAccess {


  @PrimaryColumn()
  @Field(()=> Int)
  user_id: number;

  @OneToOne(()=> User, { cascade: true})
  @JoinColumn({name: 'user_id'})
  @Field(()=> User, {nullable: true})
  user?: User;

  @BeforeInsert()
  newid() {this.user_id = this.user.id; }

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
