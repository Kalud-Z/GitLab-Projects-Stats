import {Connection} from 'typeorm';
import {DbConnectionToken} from '../../database/database.provider';
import {ProjectStatsEntity} from './model/project-stats.entity';

export const ProjectStatsRepositoryToken = 'ProjectStatsRepositoryToken';
export const ProjectStatsProviders = [
  {
    provide: ProjectStatsRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(ProjectStatsEntity),
    inject: [DbConnectionToken],
  },
];

