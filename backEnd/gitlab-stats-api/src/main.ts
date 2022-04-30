
// require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });

import { AppModule } from './app.module';

import {NestFactory} from '@nestjs/core';

const PORT = 3000;

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(PORT);
  console.log(`Application is listening on port ${PORT}`);
  console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
};

bootstrap();










// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// difference between local development AND docker development:
//
//   local --- docker
// config.local.json :
// host : localhost --- postgres
// port : 15432 --- 5432
// synchronize : false --- true

// in main ts
// app.setGlobalPrefix('api');


