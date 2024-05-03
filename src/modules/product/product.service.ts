import { ConflictException, Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { ProductDto } from './dto/product-dto';
import { StockDto } from './dto/stock-dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>){
    }

    async createProduct(product: ProductDto){

        const existeProduct : ProductDto = await this.findProduct(product.id);

        if(existeProduct){
            throw new ConflictException("El producto ya existe");
        }

        return await this.productRepository.save(product)
    }

    async findProduct(id : number){
        return await this.productRepository.findOne({
            where: {id} //si fuera product_id iria :             where: {product_id: id}
        })
    }

    async findAll(){
        return await this.productRepository.find({
            where: {delete: false}
        })
    }

    async findAllDelete(){
        return await this.productRepository.find({
            where: {delete: true}
        })
    }
    async updateProduct(product: ProductDto){
        return await this.productRepository.save(product)
    }
    async softDelete(id: number){
        const existeProduct : ProductDto = await this.findProduct(id);

        if(!existeProduct){
            throw new ConflictException("El producto no existe");
        }

        if(existeProduct.delete){
            throw new ConflictException("El producto ya ha sido borrado")
        }
        this.productRepository.update(
            {id},
            {delete: true}
        );
    }
    async restoredProduct(id: number){
        const existeProduct : ProductDto = await this.findProduct(id);

        if(!existeProduct){
            throw new ConflictException("El producto no existe");
        }

        if(!existeProduct.delete){
            throw new ConflictException("El producto no esta borrado")
        }
        this.productRepository.update(
            {id},
            {delete: false}
        );
    }

    //stock
    async updateStock(s: StockDto){
        console.log("first")
        const product: ProductDto = await this.findProduct(s.id);
        if(!product){
            throw new ConflictException("El producto no existe")
        }
        if(product.delete){
            throw new ConflictException("El producto ha sido eliminado por lo tanto no es posible actualizar el stock")
        }

        const rows = await this.productRepository.update(
            {id : s.id},
            {stock: s.stock}
        )
        return rows.affected == 1;

    }
}
