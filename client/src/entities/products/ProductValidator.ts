

type ValidationResultT = {
  isValid: boolean;
  error: string | null;
};

type ProductValidationT = {
  title: string;
  phone: string;
}

export default class ProductValidator {
  static validate(product: ProductValidationT): ValidationResultT {
    const { title, phone } = product;
    if (!title || typeof title !== "string" || title.trim() === "") {
      return {
        isValid: false,
        error: "Title must be string",
      };
    }
    if (!phone || typeof phone !== "string" || phone.trim() === "") {
      return {
        isValid: false,
        error: "phone must be string",
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }
}
