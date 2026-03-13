export type apiResponse = {
    message: string;
};

export type apiResponseError = {
    message: string;
    errors?: Record<string, string[]>;
};
