import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CityService {
  constructor(private httpService: HttpService) { }

  // create(createCityDto: CreateCityDto) {
  //   return 'This action adds a new city';
  // }

  async consultService(acronym: string) {
    const response = await this.httpService.axiosRef.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${acronym}?providers=dados-abertos-br,gov,wikipedia`)

    return response.data
  }

  // findAll() {
  //   return `This action returns all city`;
  // }
}
