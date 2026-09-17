import { ViaCepRawResponse } from "../type/via-cep-raw.type.js";


export class CepResponseDto {
  zipCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;

  static fromViaCep(data: ViaCepRawResponse): CepResponseDto {
    const dto = new CepResponseDto();
    dto.zipCode = data.cep;
    dto.street = data.logradouro;
    dto.complement = data.complemento || undefined;
    dto.neighborhood = data.bairro;
    dto.city = data.localidade;
    dto.state = data.uf;
    return dto;
  }
}