
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../user.repository.js";
import { AddressRepository } from "../../Address/address.repository.js";

import { CreateUserDto } from "../DTO/create-user-DTO.js";
import { UserService } from "../user.service.js";
import { PrismaService } from "../../../prisma/prisma.service.js";
@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UsersRepository,
    private readonly userService: UserService,
    private readonly addressRepository: AddressRepository,
  ) {}

  async execute(input: CreateUserDto) {
    const { address, ...userData } = input;
    await this.userService.verifyExistUser(userData.email)

    return this.prisma.$transaction(async (tx) => {
      const user = await this.userRepository.create(userData, tx);

      await this.addressRepository.create(
        { ...address, userId: user.id },
        tx,
      );

      return {
        ...user,
        address,
      };
    });
  }
}