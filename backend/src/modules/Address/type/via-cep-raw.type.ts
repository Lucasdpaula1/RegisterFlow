// src/modules/Address/types/viacep-raw.type.ts
export interface ViaCepRawResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean; // ViaCEP retorna { erro: true } quando o CEP não existe
}