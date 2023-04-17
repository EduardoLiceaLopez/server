import { ObjectType, Field, Int } from "@nestjs/graphql";

import { UserAccess } from "src/user_access/entities/user_access.entity";
import { UserType } from "src/user_types/entities/user_type.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
@ObjectType()

    export class User {
        @PrimaryGeneratedColumn()
        @Field()
        id: number;

        @Column()
        @Field()
        name: string;

        @Column()
        @Field()
        middle_name: string;
        
        @Column()
        @Field({nullable: true})
        last_name?: string;
        
        @Column()
        @Field()
        curp: string;
        
        @Column()
        @Field()
        rfc: string;
        
        @Column()
        @Field((type) => String)
        phone_number: string;
        
        @Column()
        @Field()
        email: string;
    
        @Column()
        @Field(() => Int)
        user_type_id: number;

        @ManyToOne(() => UserType, (userType) => userType.users)
        //@Field(()=> UserType, { nullable: true })
        @JoinColumn({name: 'user_type_id'})
        @Field({deprecationReason: 'This field has been removed and will always return null' })
        user_type?: UserType;

       @OneToMany(()=> UserAccess, (userAccess) => userAccess.user)
       @Field(()=> [UserAccess])
       user_access: UserAccess[];
       //joinCoun
    }






