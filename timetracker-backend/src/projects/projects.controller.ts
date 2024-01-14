import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AccessGuard } from '../auth/guards/AccessGuard.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { RequestWithUser } from '../auth/interface/requestWithUser.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(AccessGuard)
  @Post()
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Req() request: RequestWithUser,
  ) {
    return this.projectsService.createProject({
      name: createProjectDto.name,
      userId: request.user.id,
    });
  }

  @UseGuards(AccessGuard)
  @Get('')
  async getProjects(@Req() request: RequestWithUser) {
    return this.projectsService.getProjects(request.user.id);
  }
}
