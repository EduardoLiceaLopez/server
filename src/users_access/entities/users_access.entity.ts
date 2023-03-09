import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UsersAccess {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;
    
    
    @Field(() => [User], {nullable: true})
    user_id: User[];
    
    @Column()
    @Field()
    user_name: string;
    
    @Column()
    @Field()
    password: string;
    
    @Column()
    @Field()
    user_role: string
}
