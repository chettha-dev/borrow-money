import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
      .setTitle(`borrow`)
      .setDescription(`The API description`)
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('document', app, document);

  app.enableCors();
  await app.listen(3000);
}

bootstrap();
