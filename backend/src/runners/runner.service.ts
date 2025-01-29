// src/runners/runners.service.ts --> gestionar lógica de negocio de los datos y realizar operaciones CRUD en base de datos usando Mongoose.
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Runner } from './runner.schema';
import { CreateRunnerDto } from './dto/create-runner.dto';

@Injectable()
export class RunnerService {
  constructor(@InjectModel(Runner.name) private runnerModel: Model<Runner>) {} //Model-> clase de Mongoose, biblioteca para trabajar con MongoDB en Node.js -> clase para interactuar con documentos dentro de una colección en la base de datos MongoDB

  // Método para crear un corredor
  async createRunner(createRunnerDto: CreateRunnerDto): Promise<Runner> {
    const runner = new this.runnerModel(createRunnerDto); // Utilizamos el DTO para crear el corredor
    return runner.save(); // Guardamos el corredor en la base de datos
  }

  // Método para obtener todos los corredores
  async getAllRunners(): Promise<Runner[]> {
    return this.runnerModel.find().exec();
  }

  // Método para obtener un corredor por su ID
  async getRunnerById(runnerId: string): Promise<Runner | null> {
    return this.runnerModel.findById(runnerId).exec();
  }

  // Método para actualizar un corredor
  async updateRunner(
    id: string,
    updateRunnerDto: CreateRunnerDto,
  ): Promise<Runner | null> {
    return this.runnerModel
      .findByIdAndUpdate(id, updateRunnerDto, { new: true })
      .exec();
  }

  //Método deleteRunner en el servicio:
  async deleteRunner(id: string): Promise<void> {
    await this.runnerModel.findByIdAndDelete(id).exec();
  }
}
