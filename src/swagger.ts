import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const SWAGGER_API_DOC_ROOT = 'api/docs';
const SWAGGER_API_NAME = 'SOLAR PROJECT RELATE SITE API';
const SWAGGER_API_DESCRIPTION = 'SOLAR PROJECT RELATE SITE API';
const SWAGGER_API_CURRENT_VERSION = '1.0';
const SWAGGER_API_AUTH_NAME = 'Authorization';
const SWAGGER_API_AUTH_LOCATION = 'header';

export const setupSwagger = (app: INestApplication, isProduction: boolean) => {
  const devModeText = !isProduction ? ' (DEV MODE)' : '';
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION + devModeText)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: SWAGGER_API_AUTH_NAME,
      in: SWAGGER_API_AUTH_LOCATION,
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_API_DOC_ROOT, app, document);
};
