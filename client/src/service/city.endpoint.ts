import { CityServiceType } from "@/types/city.type";
import { api } from "./client";

export class CityEndpoint {
  static async getAllByService(state: string): Promise<CityServiceType[]> {
    const response = await api.get(`city/service/${state}`);

    return response.data;
  }
}
