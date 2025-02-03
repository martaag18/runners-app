import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEvent } from './userEvent.schema';
import { CreateUserEventDto } from './dto/create-userEvent.dto';

@Injectable()
export class UserEventService {
  constructor(
    @InjectModel(UserEvent.name)
    private readonly userEventModel: Model<UserEvent>,
  ) {}

  // Crear user event
  async createUserEvent(
    createUserEventDto: CreateUserEventDto,
  ): Promise<UserEvent> {
    const createdUserEvent = new this.userEventModel(createUserEventDto);
    return createdUserEvent.save();
  }

  // Get user event
  async getAllUserEvents(): Promise<UserEvent[]> {
    return this.userEventModel.find().exec();
  }

  // Get user event by id
  async getUserEventById(eventId: string): Promise<UserEvent | null> {
    return this.userEventModel.findById(eventId).exec();
  }

  // Update user event
  async updateUserEvent(
    id: string,
    updateUserEventDto: CreateUserEventDto,
  ): Promise<UserEvent | null> {
    return this.userEventModel
      .findByIdAndUpdate(id, updateUserEventDto, { new: true })
      .exec();
  }

  // Delete user event
  // Método para eliminar un evento usando su ID
  async deleteUserEvent(id: string): Promise<void> {
    console.log('Eliminando evento en la base de datos con _id:', id); // Verifica que el ID se usa correctamente
    await this.userEventModel.deleteOne({ _id: id }).exec(); // Usamos _id de MongoDB
  }
}
