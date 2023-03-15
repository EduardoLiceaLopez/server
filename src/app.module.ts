import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path'; //Puede unir dos directorios
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersAccessModule } from './users_access/users_access.module';
import { UserTypesModule } from './user_types/user_types.module';
import { UserAccessModule } from './user_access/user_access.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                          //ruta actual
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
    synchronize: true,
  })
  ,UsersModule, UsersAccessModule, UserTypesModule, UserAccessModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
