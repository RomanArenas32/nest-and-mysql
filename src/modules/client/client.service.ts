import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entity/client.entity';
import { ClientDto } from './dto/client-dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>
    ){}

    createClient(client: ClientDto){
        return this.clientRepository.save(client);
    }
}
