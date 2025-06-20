import { axiosInstance } from "../../../shared/lib/axiosInstance"
import type { FormatResponseType } from "../../../shared/types"
import type { LoginT, RegisterT, TokenAndUserT, UserT } from "../types/UserTypes"



export class UserApi {

  static async getAll(): Promise<FormatResponseType<UserT[]>> {
    const { data } = await axiosInstance.get<FormatResponseType<UserT[]>>(`/users`)
    return data
  }

  // * Авторизация начинает тут
  static async register(inputs:RegisterT): Promise<FormatResponseType<TokenAndUserT>> {
    const { data } = await axiosInstance.post<FormatResponseType<TokenAndUserT>>(`/auth/signUp`, 
      inputs // * Чтобы куки принимались клиентом
    )
    return data
  }

  static async login(inputs:LoginT): Promise<FormatResponseType<TokenAndUserT>> {
    const { data } = await axiosInstance.post<FormatResponseType<TokenAndUserT>>(`/auth/signIn`,
      inputs
    )
    return data
  }

  static async logout(): Promise<FormatResponseType<null>> {
    const { data } = await axiosInstance.get<FormatResponseType<null>>(`/auth/logout`,)
    return data
  }

  static async refresh(): Promise<FormatResponseType<TokenAndUserT>> {
    const { data } = await axiosInstance.get<FormatResponseType<TokenAndUserT>>(`/auth/refreshTokens`,)
    return data
  }

  // * Авторизация заканчивается тут

//   static async delete(id): Promise<any> {
//     const { data } = await axiosInstance.delete(`/users/${id}`)
//     return data
//   }

//   static async getOne(id) {
//     const { data } = await axiosInstance.get(`/users/${id}`)
//     return data
//   }

//   static async update(id, inputs) {
//     const { data } = await axiosInstance.put(`/users/${id}`, inputs)
//     return data
//   }
}
