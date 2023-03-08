import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path'; //Puede unir dos directorios
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

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
    entities: [User],
  //autoLoadEntities: true,
    synchronize: true,
  })
  ,UsersModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
