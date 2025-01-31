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
    const createdEvent = new this.userEventModel(createUserEventDto);
    return createdEvent.save();
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
  async deleteUserEvent(id: string): Promise<void> {
    await this.userEventModel.findByIdAndDelete(id).exec();
  }
}
