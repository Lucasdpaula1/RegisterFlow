import { Controller, Get, Param } from "@nestjs/common";
import { FindCepParamsDto } from "./utils/clean-cep.js";
import { CepResponseDto } from "./DTO/cep-response-DTO.js";
import { AddressService } from "./address.service.js";

@Controller('address')
export class AddressController{
constructor(private readonly addressService: AddressService) {}


    @Get('search/cep/:cep')
  async findCep(@Param() params: FindCepParamsDto): Promise<CepResponseDto> {
    return this.addressService.findByCep(params.cep);
  }
}