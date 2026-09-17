import { AddressEntity } from "../../Address/entity/address-entity.js";
import { UserEntity } from "../entity/user-entity.js";

// src/modules/User/dto/user-with-address-response.dto.ts
export class AddressResponseDto {
  id: string;
  zipCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
}

export class UserWithAddressResponseDto {
  id: string;
  email: string;
  cpf: string;
  name: string;
  address: AddressResponseDto;

  static fromEntity(
    user: UserEntity & { address: AddressEntity | null },
  ): UserWithAddressResponseDto {
    const dto = new UserWithAddressResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.cpf = user.cpf;
    dto.name = user.name;

    if (user.address) {
      dto.address = {
        id: user.address.id,
        zipCode: user.address.zipCode,
        street: user.address.street,
        complement: user.address.complement ?? undefined,
        neighborhood: user.address.neighborhood,
        city: user.address.city,
        state: user.address.state,
        number: user.address.number,
      };
    }

    return dto;
  }
}