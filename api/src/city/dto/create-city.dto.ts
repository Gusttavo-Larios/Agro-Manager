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

    @IsNumber({
        maxDecimalPlaces: 0
    }, {
        message: "A referência ao estado deve ser um número inteiro."
    })
    @IsPositive(
        {
            message: "A referência ao estado deve ser um número positivo."
        }
    )
    @IsNotEmpty({
        message: "O id do estado é requerido."
    })
    state_id: number;

    @IsString()
    @IsNotEmpty({
        message: "O código do ibge da cidade é requerido."
    })
    @Length(7, 7, {
        message: "O código do ibge da cidade deve ter 7 caracteres."
    })
    ibge_code: string;
}
