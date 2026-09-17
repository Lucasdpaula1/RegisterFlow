import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './modules/User/user.module.js';
import { AddressModule } from './modules/Address/address.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [UserModule,AddressModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
