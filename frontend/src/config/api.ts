// src/config/api.ts
import axios from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(
        new ApiError('Não foi possível conectar ao servidor. Verifique sua conexão.'),
      );
    }

    const message =
      error.response.data?.message ?? 'Erro ao comunicar com o servidor';

    return Promise.reject(new ApiError(message, error.response.status));
  },
);