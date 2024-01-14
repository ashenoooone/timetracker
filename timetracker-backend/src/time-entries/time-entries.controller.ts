import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { AccessGuard } from '../auth/guards/AccessGuard.guard';
import { RequestWithUser } from '../auth/interface/requestWithUser.interface';

@Controller('time')
export class TimeEntriesController {
  constructor(private readonly timeEntriesService: TimeEntriesService) {}

  @UseGuards(AccessGuard)
  @Post('')
  async createTimeEntry(
    @Body() createTimeEntryDto: CreateTimeEntryDto,
    @Req() request: RequestWithUser,
  ) {
    return await this.timeEntriesService.create({
      from: createTimeEntryDto.from,
      projectId: createTimeEntryDto.projectId,
      title: createTimeEntryDto.title,
      userId: request.user.id,
      to: createTimeEntryDto.to,
    });
  }

  @UseGuards(AccessGuard)
  @Get('')
  async getTimeEntries(
    @Req() request: RequestWithUser,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.timeEntriesService.getTimeEntries({
      from,
      to,
      userId: request.user.id,
    });
  }
}
