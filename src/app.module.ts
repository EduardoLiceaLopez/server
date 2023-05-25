import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path'; //Puede unir dos directorios
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypesModule } from './user_types/user_types.module';
import { UserAccessModule } from './user_access/user_access.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { RolePermModule } from './role_perm/role_perm.module';
import { UserRoleModule } from './user_role/user_role.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';


@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                          //ruta actual
    sortSchema: true,                          
  }) 
  , TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'sgi_db',
    //entities: [__dirname + '/*.entity{.js,.ts}'],
   host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'liceedu12',
    autoLoadEntities: true,
    synchronize: false, // cambiar a false
  })
  ,UsersModule, UserTypesModule, UserAccessModule, AuthModule, PermissionsModule, RolePermModule, UserRoleModule, RolesModule],

  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})

export class AppModule {}
