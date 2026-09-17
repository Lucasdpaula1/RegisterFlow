import { Injectable } from "@nestjs/common";
import { CreateAddressDto } from "./DTO/create-address-DTO.js";

import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service.js";
@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    data: CreateAddressDto & { userId: string },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    return client.address.create({ data });
  }
}