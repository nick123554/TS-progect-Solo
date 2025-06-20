import { axiosInstance } from "../../shared/lib/axiosInstance";
import type { FormatResponseType } from "../../shared/types";
import type { ProductInputsT, ProductT } from "../users/types/ProductTypes";

export class ProductApi {
  static async getAll(): Promise<FormatResponseType<ProductT[]>> {
    const { data } = await axiosInstance.get<FormatResponseType<ProductT[]>>(`/products`);

    return data;
  }

  static async create(tea: ProductInputsT): Promise<FormatResponseType<ProductT>> {
    console.log(tea);
    const { data } = await axiosInstance.post<FormatResponseType<ProductT>>(`/products`, tea);

    return data;
  }

  static async getOne(id: number): Promise<FormatResponseType<ProductT>> {
    const { data } = await axiosInstance.get<FormatResponseType<ProductT>>(`/products/${id}`);
    return data;
  }

  static async update(id: number, inputs: ProductInputsT): Promise<FormatResponseType<ProductT>> {
    const { data } = await axiosInstance.put(`/products/${id}`, inputs);
    return data;
  }

  static async delete(id:number): Promise<FormatResponseType<unknown>> {
    const { data } = await axiosInstance.delete<FormatResponseType<unknown>>(`/products/${id}`);
    // console.log("Проверка0----------------->")
    return data;
  }

  
static async getOneProductsByUser(id:number): Promise<FormatResponseType<ProductT>>  {
      const { data } = await axiosInstance.get<FormatResponseType<ProductT>>(`/products/by-author/${id}`);
      return data;
    }


}
