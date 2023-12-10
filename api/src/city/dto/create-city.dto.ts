import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, MaxLength } from "class-validator";

export class CreateCityDto {
    @IsString({
        message: "O nome da cidade dever ser uma cadeia de caracteres."
    })
    @IsNotEmpty({
        message: "O nome da cidade é requerido."
    })
    @MaxLength(64, {
        message: "O nome da cidade deve ter no máximo 64 caracteres."
    })
    city_name: string;

    @IsString({
        message: "A sigla do estado deve ser uma cadeia de caracteres."
    })
    @Length(2, 2, {
        message: "A sigla do estado deve ter 2 caracteres."
    })
    @IsNotEmpty({
        message: "O estado é requerido."
    })
    state_acronym: string;

    @IsString()
    @IsNotEmpty({
        message: "O código do ibge da cidade é requerido."
    })
    @Length(7, 7, {
        message: "O código do ibge da cidade deve ter 7 caracteres."
    })
    ibge_code: string;
}
