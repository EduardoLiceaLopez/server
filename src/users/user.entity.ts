import { ObjectType, Field, Int } from "@nestjs/graphql";


    @ObjectType()

    export class User{
        @Field((type) => Int)
        id: number;

        @Field()
        name: string;

        @Field()
        middle_name: string;
        
        @Field()
        last_name: string;
        
        @Field()
        curp: string;
        
        @Field()
        rfc: string;
        
        @Field((type) => Int)
        phone_number: number;
        
        @Field()
        email: string;
    }






