import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CryptService,
  ApplyStatusLogService,
  TimeService,
  Axis2HttpService,
  SolarProjectRelateSiteService,
  ImageProcessService,
} from './services';
import {
  ApplyStatusLogSchemaName,
  ApplyStatusLogSchema,
  ApplyStatusLogItemSchemaName,
  ApplyStatusLogItemSchema,
} from './schemas';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: parseInt(process.env.REQUEST_TIMEOUT, 10),
      }),
    }),
    MongooseModule.forFeature([
      { name: ApplyStatusLogSchemaName, schema: ApplyStatusLogSchema },
      { name: ApplyStatusLogItemSchemaName, schema: ApplyStatusLogItemSchema },
    ]),
  ],
  providers: [
    CryptService,
    ApplyStatusLogService,
    TimeService,
    Axis2HttpService,
    SolarProjectRelateSiteService,
    ImageProcessService,
  ],
  exports: [
    CryptService,
    ApplyStatusLogService,
    TimeService,
    Axis2HttpService,
    SolarProjectRelateSiteService,
    ImageProcessService,
  ],
})
export class SharedModule {}
