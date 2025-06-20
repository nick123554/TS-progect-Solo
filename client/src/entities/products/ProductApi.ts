import { axiosInstance } from "../../shared/lib/axiosInstance";

export class ProductApi {
  static async getAll() {
    const { data } = await axiosInstance.get(`/products`);

    return data;
  }

  static async create(tea) {
    console.log(tea);
    const { data } = await axiosInstance.post(`/products`, tea);

    return data;
  }

  static async getOne(id) {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return data;
  }

  static async update(id, inputs) {
    const { data } = await axiosInstance.put(`/products/${id}`, inputs);
    return data;
  }

  static async delete(id) {
    const { data } = await axiosInstance.delete(`/products/${id}`);
    // console.log("Проверка0----------------->")
    return data;
  }

  
static async getOneProductsByUser(id) {
      const { data } = await axiosInstance.get(`/products/by-author/${id}`);
      return data;
    }


}
