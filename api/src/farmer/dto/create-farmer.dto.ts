import { CreateCityDto } from "src/city/dto/create-city.dto";
import { IsEmail, IsInstance, IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString, Matches, MaxLength, ValidateNested } from 'class-validator';
import { Type } from "class-transformer";

export class CreateFarmerDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(96)
    corporate_name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(96)
    fantasy_name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(18)
    @Matches(/(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})|(\d{3}\.\d{3}\.\d{3}\-\d{2})/g, {
        message: "A identificação da empresa deve seguir um dos seguintes formatos: 99.999.999/9999-99 ou 999.999.999-99"
    })
    company_identification: string;

    @IsPhoneNumber("BR")
    phone_number: string;

    @ValidateNested()
    @Type(() => CreateCityDto)
    city: CreateCityDto;

    @IsNumber({
        maxDecimalPlaces: 0
    }, {
        message: "O identificador do criador do cadastro do agricultor dever ser um número."
    })
    @IsPositive({
        message: "O identificador do criador do cadastro do agricultor dever ser um número positivo."
    })
    @IsNotEmpty({
        message: "O identificador do criador do cadastro é requerido."
    })
    created_by: number
}
