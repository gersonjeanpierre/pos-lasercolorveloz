import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //Hace la configuración disponible globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, //Carga automáticamente las entidades
      synchronize: true, //Sincroniza la base de datos con las entidades (no recomendado en producción)
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
