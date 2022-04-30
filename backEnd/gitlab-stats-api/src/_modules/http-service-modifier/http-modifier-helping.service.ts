import { Injectable } from '@nestjs/common';
import {Subject} from 'rxjs';

@Injectable()

export class HttpModifierHelpingService {
  waitTillMinuteIsUp$  = new Subject<number>();
  fetchDataNow$ = new Subject<boolean>();
}
