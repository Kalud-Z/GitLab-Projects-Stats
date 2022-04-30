import * as moment from 'moment';
import { HttpService, Logger, Module, OnModuleInit, HttpModule as BaseHttpModule } from '@nestjs/common';
import { HttpModifierHelpingService } from './http-modifier-helping.service';

const logForDevOnly = process.env.LOCAL_DEV;


@Module({
  imports: [
    BaseHttpModule,
  ],
  exports: [
    BaseHttpModule,
    HttpModifierHelpingService
  ],
  providers: [HttpModifierHelpingService],
})

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class HttpServiceModifierModule implements OnModuleInit { //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  count = 0;
  startTime: Date;
  durationSinceFirstRequest: number;

  rateLimitResetsAt: moment.Moment;
  lastTimePausedAt: moment.Moment;
  previousRateLimitRemaining : number
  currentRateLimitRemaining : number
  cutoffValue = 50;

  constructor(
    private readonly httpService: HttpService,
    private helpingService : HttpModifierHelpingService
  ) {}


  public onModuleInit(): any {
    const logger = new Logger('Axios');
    this.startTime = new Date();

    const axios = this.httpService.axiosRef;

    axios.interceptors.request.use(config => {
      config['metadata'] = { ...config['metadata'], startDate: new Date() };
      return config;
    });

    axios.interceptors.response.use(response => {
      this.count++;
      this.durationSinceFirstRequest = this.getDifferenceDurationInSeconds(this.startTime , new Date());

      if(logForDevOnly) {
        // console.log('API Call count so far : ' , this.count);
        // console.log('duration so far :', this.durationSinceFirstRequest)
        console.log('ratelimit remaining :  ' , response.headers['ratelimit-remaining'])
      }
      

      if(this.count <= 1) {
        this.lastTimePausedAt =  moment(new Date());
        this.previousRateLimitRemaining = 600;
        this.currentRateLimitRemaining  = 600;
        this.rateLimitResetsAt = moment(<string>response.headers['ratelimit-resettime']);
      }
      else {
        this.shouldWeUpdateTheRateLimitResetTime();
        this.previousRateLimitRemaining = this.currentRateLimitRemaining;
        this.currentRateLimitRemaining =  response.headers['ratelimit-remaining'];

        if(this.currentRateLimitRemaining < this.cutoffValue) { this.activatePausingNow() }
      }

        const { config } = response;
        config['metadata'] = { ...config['metadata'], endDate: new Date() };
        const duration = config['metadata'].endDate.getTime() - config['metadata'].startDate.getTime();

        if(logForDevOnly) {
          let configUrl = (config.url).substr(1 , +((config.url.length)/2).toFixed(0)) + '...'
          logger.log(`${config.method.toUpperCase()} ${configUrl} ${duration}ms`);
          console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§');
        }

        // console.log('this is the response itself : ');
        // console.log(response)
        // console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§');
        // console.log('§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§');

        return response;
      },
      (err) => {
      console.log('error________________________________________________________________')
        logger.error(err);
        return Promise.reject(err);
      });
  }




  private getDifferenceDurationInSeconds(startTime: Date, finishTime: Date): number {
    let start = moment(startTime);
    let finish = moment(finishTime);
    return finish.diff(start , 's') // 1
  }
d
  private shouldWeUpdateTheRateLimitResetTime() {
    const currentTime = moment(new Date())
    if(currentTime >= this.rateLimitResetsAt) { this.rateLimitResetsAt.add(1, 'minutes') }
  }

  private activatePausingNow() {
    const timeNow = moment(new Date());
    const timeToWait = this.rateLimitResetsAt.diff(timeNow , 's');

    this.lastTimePausedAt = moment(new Date());
    this.helpingService.waitTillMinuteIsUp$.next(timeToWait);
  }


}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
