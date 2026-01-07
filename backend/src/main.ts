import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para permitir que el frontend acceda al backend
  const allowedOrigins = [
    'http://localhost:5173', // Frontend local (Vite)
    'http://localhost:3000', // Frontend local alternativo
    'https://dynamic-notes-frontend.onrender.com', // Frontend en Render
  ];
  
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS no permitido'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
