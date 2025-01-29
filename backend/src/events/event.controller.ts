import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from './event.schema';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string): Promise<Event | null> {
    return this.eventService.getEventById(id);
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() createEventDto: CreateEventDto,
  ): Promise<Event | null> {
    return await this.eventService.updateEvent(id, createEventDto);
  }
  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<void> {
    return await this.eventService.deleteEvent(id);
  }
}
