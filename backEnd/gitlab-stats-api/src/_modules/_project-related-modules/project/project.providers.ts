import {Connection} from 'typeorm';
import {DbConnectionToken} from '../../database/database.provider';
import {ProjectEntity} from './model/project.entity';

export const ProjectRepositoryToken = 'ProjectRepositoryToken';
export const ProjectProviders = [
  {
    provide: ProjectRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(ProjectEntity),
    inject: [DbConnectionToken],
  },
];

