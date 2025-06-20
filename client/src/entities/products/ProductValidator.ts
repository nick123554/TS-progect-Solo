export default class ProductValidator {
  static validate(product) {
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
