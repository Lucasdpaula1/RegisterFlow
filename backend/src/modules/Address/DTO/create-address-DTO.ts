// dto/create-address.dto.ts
import { IsString, IsOptional, Length } from 'class-validator';

export class CreateAddressDto {
  @IsString() @Length(8, 9)
  zipCode: string;

  @IsString()
  street: string;

  @IsOptional() @IsString()
  complement?: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;

  @IsString() @Length(2, 2)
  state: string;

  @IsString()
  number: string;
}