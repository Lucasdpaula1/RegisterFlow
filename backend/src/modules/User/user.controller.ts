import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserService } from './user.service.js';


import { RegisterUserUseCase } from './useCases/create-user-with-address.js';
import { CreateUserDto } from './DTO/create-user-DTO.js';
import { UserWithAddressResponseDto } from './DTO/users-with-address-DTO.js';
@Controller('/users')
export class UserController {
  constructor(private readonly userCase: RegisterUserUseCase,private readonly userService:UserService) {}


  @Post('/register')
  async registerUser(@Body() dto: CreateUserDto){
    return this.userCase.execute(dto)
  }
@Get()
async findAll(): Promise<UserWithAddressResponseDto[]> {
  return this.userService.findAllUsersWithAddress();
}
}
