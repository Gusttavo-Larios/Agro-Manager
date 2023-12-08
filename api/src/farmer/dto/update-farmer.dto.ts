import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmerDto } from './create-farmer.dto';
import { CreateCityDto } from 'src/city/dto/create-city.dto';

export class UpdateFarmerDto extends PartialType(CreateFarmerDto) {
    corporate_name: string;
    fantasy_name: string;
    company_identification: string;
    phone_number: string;
    city: CreateCityDto;
}
