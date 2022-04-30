import { ChartColor } from 'chart.js';


export interface ChartDataInterface {
  data : any[],
  label : string,
  backgroundColor?: ChartColor | any,
  hoverBackgroundColor?: ChartColor,
  maxBarThickness?: number,
  minBarLength?: number
}
