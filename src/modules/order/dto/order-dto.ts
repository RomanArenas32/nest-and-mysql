import { Type } from "class-transformer";
import { IsDate, IsOptional, IsUUID } from "class-validator";

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
}