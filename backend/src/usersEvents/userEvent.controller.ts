import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserEventService } from './userEvent.service';
import { CreateUserEventDto } from './dto/create-userEvent.dto';
import { UserEvent } from './userEvent.schema';

@Controller('user-events')
export class UserEventController {
  constructor(private readonly userEventService: UserEventService) {}

  @Post()
  async createUserEvent(
    @Body() createUserEventDto: CreateUserEventDto,
  ): Promise<UserEvent> {
    return this.userEventService.createUserEvent(createUserEventDto);
  }

  @Get()
  async getAllUserEvents(): Promise<UserEvent[]> {
    return this.userEventService.getAllUserEvents();
  }

  @Get(':id')
  async getUserEventById(@Param('id') id: string): Promise<UserEvent | null> {
    return this.userEventService.getUserEventById(id);
  }

  @Put(':id')
  async updateUserEvent(
    @Param('id') id: string,
    @Body() updateUserEventDto: CreateUserEventDto,
  ): Promise<UserEvent | null> {
    return this.userEventService.updateUserEvent(id, updateUserEventDto);
  }

  @Delete(':id')
  async deleteUserEvent(@Param('id') id: string): Promise<void> {
    console.log('Eliminando evento con _id:', id); // Verifica que el ID se recibe correctamente
    return this.userEventService.deleteUserEvent(id);
  }
}
