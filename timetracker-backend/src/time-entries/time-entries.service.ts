import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { ProjectsService } from '../projects/projects.service';
import { GetTimeEntriesDto } from './dto/get-time-entries.dto';

@Injectable()
export class TimeEntriesService {
  constructor(
    private readonly dbClient: DatabaseService,
    private readonly projectsService: ProjectsService,
  ) {}

  async getTimeEntries(getTimeEntriesDto: GetTimeEntriesDto) {
    console.log(getTimeEntriesDto.from);
    console.log(typeof getTimeEntriesDto.from);

    return this.dbClient.timeEntries.findMany({
      where: {
        usersId: getTimeEntriesDto.userId,
        created_at: {
          lte: getTimeEntriesDto.to,
          gte: getTimeEntriesDto.from,
        },
      },
      select: {
        project: {
          select: {
            name: true,
            id: true,
          },
        },
        to: true,
        from: true,
        id: true,
        created_at: true,
        title: true,
      },
    });
  }

  async create(data: CreateTimeEntryDto) {
    const { userId, title, from, projectId, to } = data;

    const project = await this.projectsService.getProject(projectId);

    if (!project) {
      throw new BadRequestException('Проект не найден');
    }

    return this.dbClient.timeEntries.create({
      data: {
        usersId: userId,
        title: title,
        from: from,
        to: to,
        projectsId: projectId,
      },
      select: {
        project: {
          select: {
            name: true,
            id: true,
          },
        },
        to: true,
        from: true,
        id: true,
        created_at: true,
        title: true,
      },
    });
  }
}
