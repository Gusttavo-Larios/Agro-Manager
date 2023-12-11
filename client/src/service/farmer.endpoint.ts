import { FarmerType } from "@/types/farmer.type";
import { api } from "./client";

export type FarmerGetAllReturnType = {
  data: FarmerType[] | [];
  currentPage: number;
  totalPages: number;
};

type FarmerCreateForm = {
  corporate_name: string;
  fantasy_name: string;
  company_identification: string;
  phone_number: string;
  city: {
    city_name: string;
    state_acronym: string;
    ibge_code: string;
  };
  // created_by: number;
};

type FarmerUpdateForm = Omit<FarmerCreateForm, "created_by">;

export class FarmerEndpoint {
  static async getAll(page?: number): Promise<FarmerGetAllReturnType> {
    const response = await api.get("farmer", {
      params: {
        page,
      },
    });

    return response.data;
  }

  static async get(id: number): Promise<FarmerType> {
    const response = await api.get(`farmer/${id}`);

    return response.data;
  }

  static async update(id: number, data: FarmerUpdateForm): Promise<FarmerType> {
    const response = await api.patch(`farmer/${id}`, data);

    return response.data;
  }

  static async create(data: FarmerCreateForm): Promise<FarmerType> {
    const response = await api.post(`farmer`, data);

    return response.data;
  }

  static async delete(id: number): Promise<FarmerType> {
    const response = await api.delete(`farmer/${id}`);

    return response.data;
  }
}
