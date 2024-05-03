import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/entity/product.entity'; // Importa la entidad Product

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shop',
      entities: [Product], // Incluye la entidad Product aquí
      synchronize: true,
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
