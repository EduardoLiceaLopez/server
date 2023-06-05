import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RolePerm } from 'src/role_perm/entities/role_perm.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


//Esta  entidad describe los permisos de cada Role
@Entity('permissions')
@ObjectType()
export class Permission {
  
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field(()=> String)
  action: string;
  //Se describe tal cual una acción o función dentro de un servicio

  @Column()
  @Field(()=> String)
  description: string;

  @Column()
  @Field(()=> String)
  name: string;

  @Field(()=> RolePerm)
  role_perm: [RolePerm];

}
