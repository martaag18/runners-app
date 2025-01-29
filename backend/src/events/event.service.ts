import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './event.schema';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  // Método para crear un evento
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = new this.eventModel(createEventDto);
    return event.save();
  }

  // Método para obtener todos los eventos
  async getAllEvents(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  // Método para obtener un evento por su ID
  async getEventById(eventId: string): Promise<Event | null> {
    return this.eventModel.findById(eventId).exec();
  }

  // Método para actualizar un event
  async updateEvent(
    id: string,
    updateEventDto: CreateEventDto,
  ): Promise<Event | null> {
    return this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
  }

  //Método eliminar event en el servicio:
  async deleteEvent(id: string): Promise<void> {
    await this.eventModel.findByIdAndDelete(id).exec();
  }
}
