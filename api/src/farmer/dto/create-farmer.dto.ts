import { CreateCityDto } from "src/city/dto/create-city.dto";

export class CreateFarmerDto {
    corporate_name: string;
    fantasy_name: string;
    company_identification: string;
    phone_number: string;
    city: CreateCityDto;
    created_by: number
    state_id: number
}
