import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product-dto';
import { StockDto } from './dto/stock-dto';

@Controller('api/v1/products')
@ApiTags('productos')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiOperation({
    description: "Crea un producto"
  })
  @ApiBody({
    description: "Crea un producto mediante un productDto",
    type: ProductDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 1,
          "name": "Campera Nike",
          "price": 25,
          "stock": 200,
          "delete": false 
        }
      },
      ejemplo2: {
        value: {
          "name": "Campera Nike",
          "price": 25,
          "stock": 200,
        }
      }
    }
  })
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Get()
  @ApiOperation({
    description: "Obten todos los productos no borrados"
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get('/deleted')
  @ApiOperation({
    description: "Obten todos los productos borrados"
  })
  findAllDelete() {
    return this.productService.findAllDelete();
  }

  @Get('/:id')
  @ApiOperation({
    description: "Obten un prducto mediante su id"
  })
  @ApiParam({
    name: "id",
    description: "id del producto",
    required: true,
    type: Number
  })
  getProductById(@Param('id') id: number) {
    return this.productService.findProduct(id);
  }
  @Put()
  @ApiOperation({
    description: "Actualiza un producto"
  })
  @ApiBody({
    description: "Actualiza un producto mediante un productDto, si no existe lo crea",
    type: ProductDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 1,
          "name": "Campera Nike",
          "price": 25,
          "stock": 200,
        }
      }
    }
  })
  updateProduct(@Body() product: ProductDto) {
    return this.productService.updateProduct(product);
  }
  @Delete('/:id')
  @ApiOperation({
    description: "Elimina productos mediante borrado suave"
  })
  @ApiParam({
    name: "id",
    description: "id del producto",
    required: true,
    type: Number
  })
  deleteProduct(@Param('id') id: number) {
    return this.productService.softDelete(id);
  }
  @Patch('/restored/:id')
  @ApiOperation({
    description: "Recupera un producto eliminado"
  })
  @ApiParam({
    name: "id",
    description: "id del producto",
    required: true,
    type: Number
  })
  restoreProduct(@Param('id') id: number) {
    return this.productService.restoredProduct(id);
  }
  //stock
  @Patch('/stock')
  @ApiOperation({
    description: "Actualiza el stock de un producto"
  })
  @ApiBody({
    description: "Actualiza el stock de un producto mediante un stockDto",
    type: StockDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 1,
          "stock": 200
        }
      }
    }
  })
  updateStock(@Body() stock: StockDto) {
    return this.productService.updateStock(stock);
  }
  @Patch('/increment-stock')
  @ApiOperation({
    description: "Incrementa el stock"
  })
  @ApiBody({
    description: "En caso de superar el stock este se fija en 1000",
    type: StockDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 1,
          "stock": 200
        }
      }
    }
  })
  incrementStock(@Body() stock: StockDto) {
    return this.productService.incrementStock(stock);
  }
  @Patch('/decrement-stock')
  @ApiOperation({
    description: "Decrementa el stock"
  })
  @ApiBody({
    description: "En caso de ser menor a 0 se fija en 0",
    type: StockDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 1,
          "stock": 200
        }
      }
    }
  })
  decrementStock(@Body() stock: StockDto) {
    return this.productService.decrementStock(stock);
  }
}
