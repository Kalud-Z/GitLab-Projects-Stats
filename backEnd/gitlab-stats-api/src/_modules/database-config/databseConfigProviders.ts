import {GitlabStatsServerConfig} from './gitlab-stats-server-config';
import * as fs from 'fs';

const GITLABSTATS_CONFIG_PATH  = process.env.LOCAL_DEV ? process.cwd() + '/config.local.json' : process.cwd() + '/config.docker.json';


export const GITLABSTATS_CONFIG_TOKEN = 'GITLABSTATS_CONFIG_TOKEN';

export async function getGitlabStatsServerConfig(): Promise<GitlabStatsServerConfig> {
    console.log('FFFFFFFFFFFFFF: ', process.env.LOCAL_DEV);
    return new Promise<GitlabStatsServerConfig>((resolve, reject) => {
      fs.readFile(GITLABSTATS_CONFIG_PATH, 'utf8', function (err: any | null, data: string) {
            if(err) { reject(err) }
            resolve(JSON.parse(data) as GitlabStatsServerConfig);
        });
    });
}



export const databseConfigProviders = [
    {
        provide: GITLABSTATS_CONFIG_TOKEN,
        useFactory: async (myLogger: any) => { return await getGitlabStatsServerConfig(); }
    },
];
