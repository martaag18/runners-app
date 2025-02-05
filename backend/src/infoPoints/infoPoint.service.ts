// src/info-points/info-point.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InfoPoint } from './infoPoint.schema';
import { CreateInfoPointDto } from './dto/create-infoPoint.dto';

@Injectable()
export class InfoPointService {
  constructor(
    @InjectModel(InfoPoint.name) private infoPointModel: Model<InfoPoint>,
  ) {}

  // Crea un nuevo info point
  async createInfoPoint(
    createInfoPointDto: CreateInfoPointDto,
  ): Promise<InfoPoint> {
    const infoPoint = new this.infoPointModel(createInfoPointDto);
    return infoPoint.save();
  }

  // Obtiene todos los info points
  async getAllInfoPoints(): Promise<InfoPoint[]> {
    return this.infoPointModel.find().exec();
  }

  // Obtiene un info point por su ID
  async getInfoPointById(id: string): Promise<InfoPoint | null> {
    return this.infoPointModel.findById(id).exec();
  }

  // Actualiza un info point
  async updateInfoPoint(
    id: string,
    updateInfoPointDto: CreateInfoPointDto,
  ): Promise<InfoPoint | null> {
    return this.infoPointModel
      .findByIdAndUpdate(id, updateInfoPointDto, { new: true })
      .exec();
  }

  // Elimina un info point
  async deleteInfoPoint(id: string): Promise<void> {
    await this.infoPointModel.findByIdAndDelete(id).exec();
  }
}
