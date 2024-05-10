import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

import { ValidationPipe } from './core/pipes';
import { join } from 'path';

import * as http from 'http';
import * as express from 'express';
import * as moment from 'moment';
import * as dotenv from 'dotenv';
import * as appRoot from 'app-root-path';

import { setupSwagger } from './swagger';

dotenv.config({ path: appRoot.resolve('.env') });

async function bootstrap() {
  const isProd: boolean = process.env.PRODUCTION === 'true';
  const isWriteLog: boolean = process.env.WRITE_LOG === 'true';
  const serverPort: number = parseInt(process.env.SERVER_PORT, 10) || 3000;
  const logger = new Logger('bootstrap');
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
    {
      logger: isWriteLog
        ? WinstonModule.createLogger({
            level: 'info',
            format: winston.format.combine(
              winston.format.timestamp({
                format: () =>
                  moment().utcOffset(7).format('YYYY-MM-DD HH:mm:ss'),
              }),
              winston.format.printf((data) => {
                const { level, message, timestamp } = data;
                if (level === 'error' || (level === 'warning' && data.stack)) {
                  return `${timestamp} ${level}: ${message} \n${data.stack}`;
                }

                return `${timestamp} ${level}: ${message}`;
              }),
            ),
            transports: [
              new DailyRotateFile({
                dirname: './logs',
                filename: 'error-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: false,
                maxFiles: '60d',
                level: 'error',
              }),
              new DailyRotateFile({
                dirname: './logs',
                filename: 'error-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: false,
                maxFiles: '60d',
                level: 'warning',
              }),
              new DailyRotateFile({
                dirname: './logs',
                filename: 'info-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: false,
                maxFiles: '60d',
                level: 'info',
              }),
            ],
          })
        : true,
    },
  );

   // เพิ่ม middleware เพื่อจำกัดขนาดของ payload
   app.use(express.json({ limit: '100mb' })); // กำหนดขนาดสูงสุดเป็น 100MB สามารถปรับขนาดตามความต้องการ
   app.use(express.urlencoded({ limit: '100mb', extended: true }));

   

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Set API Doc with Swagger
  setupSwagger(app, isProd);

  await app.init();

  http.createServer(server).listen(serverPort, '0.0.0.0', () => {
    if (!isProd) {
      logger.log(`API Start on Port ${serverPort}`);
    }
  });
}
bootstrap();
