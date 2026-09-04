import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config(); // Carrega as variáveis do arquivo .env

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres', // ou o seu banco
  // url: process.env.DATABASE_URL,
  // url: configService.get<string>('DATABASE_URL'),
  host: configService.get<string>('DB_HOST'),
  port: 5432,
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  //em dev
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false, // Nunca use true em produção com migrations!
});
