import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ProductDto{

    @IsOptional()
    @IsNumber()
    @IsPositive()
    id?: number;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price!: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    stock!: number;

    @IsBoolean()
    @IsOptional()
    delete?: boolean;
}