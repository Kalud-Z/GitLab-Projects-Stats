import {createConnection} from 'typeorm';
import {GitlabStatsServerConfig} from '../database-config/gitlab-stats-server-config';
import {GITLABSTATS_CONFIG_TOKEN} from '../database-config/databseConfigProviders';

export const DbConnectionToken = 'DbConnectionToken';

export const databaseProviders = [
    {
        provide: DbConnectionToken,
        useFactory: async (config: GitlabStatsServerConfig) => {
            return await createConnection({
                ...config.dbConfig,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
            });
        },
        inject: [GITLABSTATS_CONFIG_TOKEN],  // TODO : why is this ?
    },
];
