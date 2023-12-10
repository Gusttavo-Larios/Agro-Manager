import { StateType } from "./state.type";

export type CityType = {
  id: number;
  city_name: string;
  ibge_code: string;
  state_id: number;
  state?: StateType;
  createdAt: string;
  updatedAt: string;
};

export type CityServiceType = {
  nome: string;
  codigo_ibge: string;
};
