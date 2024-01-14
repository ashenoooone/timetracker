import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Projects } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly dbClient: DatabaseService) {}

  async createProject(createProjectDto: { userId: number; name: string }) {
    const existingProject = this.dbClient.projects.findFirst({
      where: {
        usersId: createProjectDto.userId,
        name: createProjectDto.name,
      },
    });

    if (existingProject) {
      throw new BadRequestException('Такой проект уже существует');
    }

    return this.dbClient.projects.create({
      data: {
        usersId: createProjectDto.userId,
        name: createProjectDto.name,
      },
    });
  }
  async getProjects(userId: number) {
    return this.mapProjects(
      await this.dbClient.projects.findMany({
        where: {
          usersId: userId,
        },
      }),
    );
  }

  async getProject(id: number) {
    return this.dbClient.projects.findUnique({
      where: {
        id: id,
      },
    });
  }

  async mapProjects(projects: Projects[]) {
    return projects.map((p) => {
      return {
        id: p.id,
        name: p.name,
      };
    });
  }
}
