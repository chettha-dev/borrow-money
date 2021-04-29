import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV != 'production') {
    const options = new DocumentBuilder()
      .setTitle(`wms`)
      .setDescription(
        `WMS Back-End application is RESTful API responsible 
        for company's warehouse internal operations e.g. managing inventory items, 
        inbound & outbound process, etc. Target user includes warehouse officers.`,
      )
      .setVersion('1.0')
      .addBearerAuth({type: 'http', scheme: 'bearer', bearerFormat: 'JWT'})
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  app.enableCors();
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
  
  app.use(Sentry.Handlers.requestHandler());
  await app.listen(3000);
}

bootstrap();
