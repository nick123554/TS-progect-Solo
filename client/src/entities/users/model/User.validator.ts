// Отдельные типы для входных данных и результата валидации
export type UserData = {
  name: string;
  email: string;
  password: string;
};

export type ValidationResult = {
  isValid: boolean;
  error: string | null;
};

export class UserValidator {
  // Валидация email
  static validateMail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  // Валидация пароля
  static validatePassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*()\-.,?":{}|<>]/;
    const isValidLength = password.length >= 8;

    return (
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumbers.test(password) &&
      hasSpecialCharacters.test(password) &&
      isValidLength
    );
  }

  // Основная валидация всех полей
  static validate(user: UserData): ValidationResult {
    const { name, email, password } = user;

    if (
      !name ||
      !email ||
      !password ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      return {
        isValid: false,
        error: "Создание пользователя с такими полями не доступно",
      };
    }

    if (!this.validateMail(email)) {
      return { isValid: false, error: "Неподдерживаемый формат почты" };
    }

    if (!this.validatePassword(password)) {
      return {
        isValid: false,
        error:
          "Неподдерживаемый формат пароля. Должен быть символ, большая буква, маленькая, цифра и не менее 8 символов.",
      };
    }

    return { isValid: true, error: null };
  }
}
