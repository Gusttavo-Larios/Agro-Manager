import { StateType } from "@/types/state.type";
import { api } from "./client";

export class StateEndpoint {
  static async getAll(): Promise<StateType[]> {
    const response = await api.get("state");

    return response.data;
  }
}
