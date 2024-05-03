import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product-dto';
import { StockDto } from './dto/stock-dto';

@Controller('api/v1/products')
@ApiTags('productos')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/deleted')
  findAllDelete() {
    return this.productService.findAllDelete();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.findProduct(id);
  }
  @Put()
  updateProduct(@Body() product: ProductDto){
    return this.productService.updateProduct(product)
  }
  @Delete('/:id')
  deleteProduct(@Param('id') id:number){
    return this.productService.softDelete(id);
  }
  @Patch('/restored/:id')
  restoreProduct(@Param('id') id:number){
    return this.productService.restoredProduct(id);
  }
  //stock
  @Patch('/stock')
  updateStock(@Body() stock: StockDto){
    return this.productService.updateStock(stock)
  }
}
