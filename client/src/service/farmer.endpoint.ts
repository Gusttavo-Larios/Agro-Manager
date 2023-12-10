import { FarmerType } from "@/types/farmer.type";
import { api } from "./client";

export type FarmerGetAllReturnType = {
  data: FarmerType[] | [];
  currentPage: number;
  totalPages: number;
};

export class FarmerEndpoint {
  static async getAll(page?: number): Promise<FarmerGetAllReturnType> {
    const response = await api.get("farmer", {
      params: {
        page,
      },
    });

    return response.data;
  }
}
