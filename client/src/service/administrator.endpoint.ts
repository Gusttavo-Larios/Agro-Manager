import { api } from "./client";

export class AdministratorEndpoint {
    static async signIn(email: string, password: string): Promise<{ access_token: string }> {

        const response = await api.post('auth/login', {
            email,
            password
        })

        return response.data
    }
}