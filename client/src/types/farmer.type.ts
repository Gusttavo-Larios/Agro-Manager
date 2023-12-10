import { CityType } from "./city.type";

export type FarmerType = {
  id: number;
  corporate_name: string;
  fantasy_name: string;
  company_identification: string;
  phone_number: string;
  city_id: number;
  city?: CityType;
  created_by: number;
};
