
export class TestReport {
  constructor(
    public error_count: number,
    public failed_count: number,
    public skipped_count: number,
    public success_count: number,
    public total_count: number,
    public total_time: number,
    public test_suites?: TestSuite[],
  ) {}
}


export interface TestCase {
  classname: string;
  execution_time: number;
  name: string;
  status: 'success' | 'failure' | 'skipped'
  system_output: string | null;
}



export interface TestSuite {
  total_count: number;
  error_count: number;
  failed_count: number;
  name: string;
  skipped_count: number;
  success_count: number;
  test_cases: TestCase[];
  total_time: number;
}


