import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';

import { ServicesController } from './controllers';
import { ProjectsService } from './services';



import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule

import { ProjectRelateSite} from './entity/project_relate_site.entity'
import { Projects } from './entity/projects.entity'; // Import your entity

@Module({
  imports: [
    SharedModule,
   
    TypeOrmModule.forFeature([Projects , ProjectRelateSite]), 
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.OPENACC_SERVICE,
        timeout: parseInt(process.env.REQUEST_TIMEOUT, 10),
      }),
    })
   
  ],
  controllers: [ServicesController],
  providers: [ProjectsService],
})
export class ServicesModule {}
