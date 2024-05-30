import { ConflictException, Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { IsNull, Repository } from 'typeorm';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { OrderDto } from './dto/order-dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private clientRepository: ClientService,
    private productRepository: ProductService, //Los servicios de client y product van a poder utilizarse aqui
  ) {}

  async createOrder(order: OrderDto) {
    
    const clienteExiste = await this.clientRepository.getClientById(
      order.client.id,
    );
    if (!clienteExiste) {
      throw new ConflictException('Cliente inexistente');
    }
    for (const p of order.products) {
  
      const product = await this.productRepository.findProduct(p.id);
      if (!product) {
        throw new ConflictException('Producto/s inexistente/s');
      } else if (product.delete) {
        throw new ConflictException('Producto/s no disponible/s');
      }
    }
    return this.orderRepository.save(order)
  }

  async getOrderById(id: string){
    return this.orderRepository.findOne({where: {id}})
  }

  async getPendingOrders(){
    return this.orderRepository.find(
        {where: {confirmAt : IsNull()}}
    )
  }
}
