import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client-dto';

@Controller('api/v1/client')
export class ClientController {
    constructor(private clientService: ClientService){}
    
    @Post()
    createClient(@Body() client: ClientDto){
        return this.clientService.createClient(client)
    }
    @Get()
    getAllClients(){
        return this.clientService.getAllClients()
    }
    @Get('/:id')
    getClientById(@Param('id') id: number){
        return this.clientService.getClientById(id);
    }
    @Put()
    updateClient(@Body() client: ClientDto){
        return this.clientService.updateClient(client)
    }
    @Delete('/:id')
    deleteClient(@Param('id') id: number){
        return this.clientService.deleteClient(id)
    }
}
