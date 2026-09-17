import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user-DTO.js';
import { CreateUserData } from './interfaces/user-contract.js';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service.js';


@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserData,tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma
    return client.user.create({
      data,
    });

  }


findAll() {
  return this.prisma.user.findMany({
    include: { address: true },
    orderBy: { name: 'asc' },
  });
}


  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}