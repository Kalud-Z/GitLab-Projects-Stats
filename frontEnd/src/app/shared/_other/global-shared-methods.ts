import * as _ from 'lodash';


export function formatTestCoverage(testCoverage: number): string {
  if(testCoverage) { return testCoverage + '%' }
  else { return '---' }
}

export function getDeepCloneOf(target : any): any {
  return  _.cloneDeep(target);
}
