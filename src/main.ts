import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Activer CORS avec des options
   app.enableCors({
    origin: 'http://localhost:3001', // Remplacez par l'origine de votre frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si vous utilisez des cookies ou des headers sécurisés
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
