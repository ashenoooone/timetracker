import { Module } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { TimeEntriesController } from './time-entries.controller';
import { DatabaseModule } from '../database/database.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  controllers: [TimeEntriesController],
  providers: [TimeEntriesService],
  imports: [DatabaseModule, ProjectsModule],
})
export class TimeEntriesModule {}
