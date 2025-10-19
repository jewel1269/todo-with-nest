import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //middleware
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
