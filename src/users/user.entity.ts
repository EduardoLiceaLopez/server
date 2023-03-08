import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
        @Field((type) => Int)
        phone_number: number;
        
        @Column()
        @Field()
        email: string;
    }






