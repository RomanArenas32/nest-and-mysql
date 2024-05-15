import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client-dto';

@Controller('api/v1/client')
export class ClientController {
    constructor(private clientService: ClientService){}
    
    @Post()
    createClient(@Body() client: ClientDto){
        return this.clientService.createClient(client)
    }
}
