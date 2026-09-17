// src/modules/Address/address.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CepResponseDto } from './DTO/cep-response-DTO.js';
import { ViaCepRawResponse } from './type/via-cep-raw.type.js';

@Injectable()
export class AddressService {
  constructor(private readonly httpService: HttpService) {}

  async findByCep(cep: string): Promise<CepResponseDto> {
    const sanitizedCep = cep.replace(/\D/g, '');
  
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<ViaCepRawResponse>(
          `https://viacep.com.br/ws/${sanitizedCep}/json/`,
        ),
      );

      if (data.erro) {
        throw new HttpException('CEP não encontrado', HttpStatus.NOT_FOUND);
      }

      return CepResponseDto.fromViaCep(data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      const axiosError = error as AxiosError;
      throw new HttpException(
        'Não foi possível consultar o CEP no momento',
        axiosError.response?.status ?? HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}