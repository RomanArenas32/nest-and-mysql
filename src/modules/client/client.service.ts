import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entity/client.entity';
import { ClientDto } from './dto/client-dto';
import { Address } from './entity/address.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  //BUSCA SI EL CLIENTE EXISTE POR SU ID O POR SU EMAIL.
  findClient(client: ClientDto) {
    return this.clientRepository.findOne({
      where: [{ id: client.id }, { email: client.email }],
    });
  }

  async createClient(client: ClientDto) {
    const existeClient = await this.findClient(client);
    if (existeClient) {
      if (client.id) {
        throw new ConflictException('El cliente ya esta registrado');
      } else {
        throw new ConflictException('El email ya esta registrado');
      }
    }

    let existeAddress: Address = null;
    if (client.address.id) {
      existeAddress = await this.addressRepository.findOne({
        where: { id: client.address.id },
      });
    } else {
      existeAddress = await this.addressRepository.findOne({
        where: {
          country: client.address.country,
          province: client.address.province,
          town: client.address.town,
          street: client.address.street,
        },
      });
    }
    console.log(existeAddress);

    if (existeAddress) {
      throw new ConflictException('La direccion ya esta registrada');
    }
    return await this.clientRepository.save(client);
  }

  async getAllClients() {
    return await this.clientRepository.find();
  }

  async getClientById(id: number) {
    return this.clientRepository.findOne({
      where: { id },
    });
  }

  async getClientByEmail(email: string) {
    return this.clientRepository.findOne({
      where: { email },
    });
  }

  async updateClient(client: ClientDto) {
    if (!client.id) {
      return await this.createClient(client);
    }

    let clienteExist = await this.getClientByEmail(client.email);

    if (clienteExist && client.id != clienteExist.id) {
      throw new ConflictException(
        `El cliente con el email ${clienteExist.email} ya esta registrado`,
      );
    }
    clienteExist = await this.getClientById(client.id);

    let existeAddress: Address = null;

    let deleteAddress = false;
    if (client.address.id) {
      existeAddress = await this.addressRepository.findOne({
        where: { id: client.address.id },
      });
      if (existeAddress && existeAddress.id != clienteExist.address.id) {
        throw new ConflictException('La direccion ya existe');
      } else if (
        JSON.stringify(existeAddress) != JSON.stringify(client.address)
      ) {
        existeAddress = await this.addressRepository.findOne({
          where: {
            country: client.address.country,
            province: client.address.province,
            town: client.address.town,
            street: client.address.street,
          },
        });
        if (existeAddress) {
          throw new ConflictException('La direccion ya esta registrada');
        } else {
          deleteAddress = true;
        }
      }
    } else {
      existeAddress = await this.addressRepository.findOne({
        where: {
          country: client.address.country,
          province: client.address.province,
          town: client.address.town,
          street: client.address.street,
        },
      });
      if (existeAddress) {
        throw new ConflictException('La direccion ya esta registrada');
      } else {
        deleteAddress = true;
      }
    }

    const updateClient = await this.clientRepository.save(client);

    // Si hemos indicado que se borre, borra la direccion del cliente.
    // Esto lo hacemos para que no se queden direcciones sin referenciar
    if (deleteAddress) {
      await this.addressRepository.delete({ id: clienteExist.address.id });
    }

    return updateClient;
  }

  async deleteClient(id: number) {
    const existeClient = await this.getClientById(id);
    if (!existeClient) {
      throw new ConflictException('El cliente es inexistente');
    }

    const rows = await this.clientRepository.delete({ id });
    if (rows.affected == 1) {
      await this.addressRepository.delete({id : existeClient.address.id})
      return true;
    }
    return false
  }
}
