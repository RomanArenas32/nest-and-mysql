import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from "class-validator"

export class StockDto {

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    id: number


    @Min(0)
    @Max(1000)
    @IsNumber()
    @IsNotEmpty()
    stock: number
}