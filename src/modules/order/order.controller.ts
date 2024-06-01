import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order-dto';

@Controller('api/v1/orders')
export class OrderController {
    constructor(private orderService: OrderService){}

    @Post()
    createOrder(@Body() order: OrderDto){
        return this.orderService.createOrder(order)
    }

    @Get('/pending')
    getPendingOrders(){
        return this.orderService.getPendingOrders()
    }
    @Get('/comfirmed')
    getConfirmOrders(@Query('start') start: Date, @Query('end') end: Date,){
        return this.orderService.getConfirmOrders()
    }

    @Get('/:id')
    getOrderById(@Param('id') id: string){
        return this.orderService.getOrderById(id)
    }
    @Get('/client/:id')
    getOrderByIdClient(@Param('id') id: number){
        return this.orderService.getOrderByIdClient(id)
    }
    @Patch('/:id')
    confirmOrder(@Param('id') id: string){
        return this.orderService.conirmOrder(id)
    }
}
