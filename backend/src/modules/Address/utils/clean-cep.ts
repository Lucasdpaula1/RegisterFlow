// src/modules/Address/dto/find-cep.dto.ts
import { Matches } from 'class-validator';

export class FindCepParamsDto {
  @Matches(/^\d{5}-?\d{3}$/, { message: 'CEP inválido' })
  cep: string;
}