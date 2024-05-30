import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ClientDto } from "src/modules/client/dto/client-dto";
import { ProductDto } from "src/modules/product/dto/product-dto";

export class OrderDto {

    @IsOptional()
    @IsUUID()
    id?: string;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    createAt?: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    updateAt?: Date;

    @IsDate()
    @IsOptional()
    @Type(()=> Date)
    confirmAt?: Date;

    @Type(()=> ClientDto)
    @IsNotEmpty()
    client!: ClientDto;

    @IsArray()
    @IsNotEmpty()
    @ArrayNotEmpty()
    @Type(()=> ProductDto)
    products!: ProductDto[]
}