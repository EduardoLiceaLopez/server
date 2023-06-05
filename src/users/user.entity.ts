import { ObjectType, Field, Int } from "@nestjs/graphql";

import { UserAccess } from "src/user_access/entities/user_access.entity";
import { UserRole } from "src/user_role/entities/user_role.entity";
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
        @Field()
        user_type?: UserType;

       @OneToMany(()=> UserAccess, (userAccess) => userAccess.user)
       @Field(()=> [UserAccess])
       user_access: UserAccess[];
       //joinCoun
       //


       //Coneccion con la tabla que reune los roles con los permisos
       @OneToMany(()=> UserRole, (userRole)=> userRole.user)
       @Field(()=> [UserRole])
       user_role: UserRole[];
    }






