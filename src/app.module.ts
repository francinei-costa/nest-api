import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o módulo disponível globalmente na aplicação{como o arquivo .env}
    }),
    CoursesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      //conexão com o banco de dados na nuvem
      // synchronize: true,
      // url: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
