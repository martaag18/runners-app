// src/info-points/info-point.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { InfoPointService } from './infoPoint.service';
import { InfoPoint } from './infoPoint.schema';
import { CreateInfoPointDto } from './dto/create-infoPoint.dto';

@Controller('info-points')
export class InfoPointController {
  constructor(private readonly infoPointService: InfoPointService) {}

  // Crea un nuevo Info Point
  @Post()
  async create(
    @Body() createInfoPointDto: CreateInfoPointDto,
  ): Promise<InfoPoint> {
    return this.infoPointService.createInfoPoint(createInfoPointDto);
  }

  // Obtiene todos los Info Points
  @Get()
  async findAll(): Promise<InfoPoint[]> {
    return this.infoPointService.getAllInfoPoints();
  }

  // Obtiene un Info Point por su ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InfoPoint | null> {
    return this.infoPointService.getInfoPointById(id);
  }

  // Actualiza un Info Point
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInfoPointDto: CreateInfoPointDto,
  ): Promise<InfoPoint | null> {
    return this.infoPointService.updateInfoPoint(id, updateInfoPointDto);
  }

  // Elimina un Info Point
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.infoPointService.deleteInfoPoint(id);
  }
}
