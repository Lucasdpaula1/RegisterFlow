import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { UsersRepository } from './user.repository.js';


import { RegisterUserUseCase } from './useCases/create-user-with-address.js';
import { AddressModule } from '../Address/address.module.js';
import { PrismaModule } from '../../prisma/prisma.module.js';


@Module({
  imports: [AddressModule,PrismaModule],
  controllers: [UserController],
  providers: [UserService,UsersRepository,RegisterUserUseCase],
  exports:[UserService,UsersRepository]
})
export class UserModule {}
