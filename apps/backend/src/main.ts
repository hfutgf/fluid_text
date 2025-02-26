import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const port = process.env.PORT;
  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });

  const config = new DocumentBuilder()
    .setTitle('FluidText API')
    .setDescription('API documentation for FluidText application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port ?? 3001, () =>
    console.log(`Server started on port: ${port}`),
  );
}
bootstrap();
