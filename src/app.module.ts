import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as appRoot from 'app-root-path';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
dotenv.config({ path: appRoot.resolve('.env') });

import { CoreModule } from './core/core.module';

import { ResponseInterceptor } from './core/interceptors';
import { ConnectionInterceptor } from './core/mssql';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './action/services.module';
import { Projects } from './action/entity/projects.entity';
import { ProjectRelateSite } from './action/entity/project_relate_site.entity';


const mongoDBOption: any = {
  connectTimeoutMS: 60000, 
  socketTimeoutMS: 60000, // เพิ่มเป็น 60 วินาที (หรือค่าที่เหมาะสมตามการทดลองและขนาดของข้อมูล)
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (
  process.env.MONGODB_USERNAME !== '' &&
  process.env.MONGODB_PASSWORD !== ''
) {
  mongoDBOption.user = process.env.MONGODB_USERNAME;
  mongoDBOption.pass = process.env.MONGODB_PASSWORD;
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ // Change MongooseModule to TypeOrmModule
      type: 'mssql',
      host: process.env.MSSQL_SERVER,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.MSSQL_USERNAME,
      password: process.env.MSSQL_PASSWORD,
      database: process.env.MSSQL_DATABASE,
      entities: [Projects,ProjectRelateSite], // Add your entity to entities array
      synchronize: true, // This option will automatically create database tables based on entity classes
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL, mongoDBOption),
    CoreModule,
    AuthModule,
    ServicesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
