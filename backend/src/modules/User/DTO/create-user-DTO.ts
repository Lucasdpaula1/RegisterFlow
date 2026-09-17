
import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from '../../Address/DTO/create-address-DTO.js';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  cpf: string;

  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
