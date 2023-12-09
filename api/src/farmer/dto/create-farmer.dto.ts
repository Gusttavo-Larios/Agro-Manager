import { IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString, Matches, MaxLength, ValidateNested } from 'class-validator';
import { Type } from "class-transformer";

import { CreateCityDto } from "src/city/dto/create-city.dto";

export class CreateFarmerDto {
    @IsString({
        message: "O nome social da empresa dever ser uma cadeia de caracteres."
    })
    @IsNotEmpty({
        message: "O nome social da empresa é requerido."
    })
    @MaxLength(96, {
        message: "O nome social da empresa deve ter no máximo 96 caracteres."
    })
    corporate_name: string;

    @IsString({
        message: "O nome fantasia da empresa dever ser uma cadeia de caracteres."
    })
    @IsNotEmpty({
        message: "O nome fantasia da empresa é requerido."
    })
    @MaxLength(96, {
        message: "O nome fantasia da empresa deve ter no máximo 96 caracteres."
    })
    fantasy_name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(18)
    @Matches(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/, {
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
