import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/entity/product.entity';
import { ClientModule } from './modules/client/client.module';
import { Client } from './modules/client/entity/client.entity';
import { Address } from './modules/client/entity/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shop',
      entities: [Product, Client, Address], // Incluye ambas entidades aquí
      synchronize: true,
    }),
    ProductModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}