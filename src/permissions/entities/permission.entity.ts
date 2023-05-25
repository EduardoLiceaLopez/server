import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Permission {
  
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field(()=> String)
  action: string;

  @Column()
  @Field(()=> String)
  description: string;

  @Column()
  @Field(()=> String)
  name: string;

}
