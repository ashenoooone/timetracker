import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [ProjectsController],
  imports: [DatabaseModule],
  providers: [ProjectsService],
})
export class ProjectsModule {}
