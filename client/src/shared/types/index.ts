export type FormatResponseType<T> = {
    statusCode: number;
    message: string;
    data: T;
    error?: string;
}

