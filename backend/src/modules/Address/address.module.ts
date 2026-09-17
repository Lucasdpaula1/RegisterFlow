import { Module } from "@nestjs/common";
import { AddressRepository } from "./address.repository.js";
import { PrismaModule } from "../../prisma/prisma.module.js";
import { AddressController } from "./address.controller.js";
import { AddressService } from "./address.service.js";
import { HttpModule, HttpService } from "@nestjs/axios";
@Module({imports:[PrismaModule,HttpModule],controllers:[AddressController],exports:[AddressRepository,AddressService],providers:[AddressRepository,AddressService]})
export class AddressModule{}