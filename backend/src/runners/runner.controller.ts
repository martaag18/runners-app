// src/runners/runners.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RunnerService } from './runner.service';
import { Runner } from './runner.schema';
import { CreateRunnerDto } from './dto/create-runner.dto';

@Controller('runners') //controlador vinculado a la ruta /runners --> todas las solicitudes que lleguen a esta ruta serán gestionadas por controlador.
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) {} //readonly -> no puede ser modificada una vez asignada

  // Método POST para crear un corredor->recibe datos del cuerpo de la solicitud->servicio para crear nuevo corredor
  @Post()
  async createRunner(
    @Body() createRunnerDto: CreateRunnerDto,
  ): Promise<Runner> {
    return this.runnerService.createRunner(createRunnerDto);
  }

  // Método GET para obtener todos los corredores
  @Get()
  async getAllRunners(): Promise<Runner[]> {
    return this.runnerService.getAllRunners();
  }

  // Método GET para obtener un corredor por ID
  @Get(':id')
  async getRunnerById(@Param('id') id: string): Promise<Runner | null> {
    return this.runnerService.getRunnerById(id);
  }

  // Método PUT para actualizar un corredor
  @Put(':id')
  async updateRunner(
    @Param('id') id: string, //@Param->decorador para extraer parámetros de la ruta (id de la URL)
    @Body() createRunnerDto: CreateRunnerDto, //@Body->extraer el cuerpo de la solicitud(información enviada con la solicitud PUT)
  ): Promise<Runner | null> {
    return await this.runnerService.updateRunner(id, createRunnerDto);
  }

  // Método DELETE para eliminar un corredor
  @Delete(':id')
  async deleteRunner(@Param('id') id: string): Promise<void> {
    return await this.runnerService.deleteRunner(id);
  }
}

/*Controller 
-> Recibir solicitudes HTTP desde el cliente y delegar la logica de negocio a los servicios. 
-> Aplicación NestJS para manejar rutas y solicitudes HTTP que provienen del cliente
-> Delega responsabilidad a los servicios
*/
