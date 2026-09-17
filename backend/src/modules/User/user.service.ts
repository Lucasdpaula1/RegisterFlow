import { Injectable,ConflictException  } from '@nestjs/common';
import { UsersRepository } from './user.repository.js';
import { UserEntity } from './entity/user-entity.js';
import { UserWithAddressResponseDto } from './DTO/users-with-address-DTO.js';

@Injectable()
export class UserService {
    constructor(private readonly  userRepository: UsersRepository){}
  async verifyExistUser(userEmail: string): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(userEmail);

    if (existingUser) {
      throw new ConflictException ('Não foi possível cadastrar este usuário');
    }
  }
async findAllUsersWithAddress(): Promise<UserWithAddressResponseDto[]> {
  const users = await this.userRepository.findAll();
  return users.map((user) => UserWithAddressResponseDto.fromEntity(user));
}
}
