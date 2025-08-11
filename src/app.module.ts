import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EnvConfigation } from './config/env.config';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //Hace la configuración disponible globalmente
      load: [EnvConfigation], //Carga la configuración desde el archivo env.config.ts
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT!,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, //Carga automáticamente las entidades
      synchronize: true, //Sincroniza la base de datos con las entidades (no recomendado en producción)
    }),
    AuthModule,
    UsersModule,
    OrdersModule,
    ClientsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }