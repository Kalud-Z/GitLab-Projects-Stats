import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TestReportEntity } from '../../test-report/model/test-report.entity';
import { TestCaseEntity } from '../../test-case/model/test-case.entity';


@Entity()
export class TestSuiteEntity extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable : true,   type : 'double precision' })
  total_time: number;

  @Column({ nullable : true })
  total_count: number;

  @Column({ nullable : true })
  error_count: number;

  @Column({ nullable : true })
  failed_count: number;

  @Column({ nullable : true })
  name: string;

  @Column({ nullable : true })
  skipped_count: number;

  @Column({ nullable : true })
  success_count: number;

  // @Column({ nullable : true })
  test_cases_temp: any;

  // _Many_ testSuites belong to _One_ testReport.
  // || who gets @ManyToOne => will have an extra column in its table pointing to the FK
  @ManyToOne(type => TestReportEntity, TestReportEntity => TestReportEntity.test_suites, {
    nullable: true,
    onDelete : "CASCADE"
  })
  testReport: TestReportEntity;



  //_One_ testSuite can have _Many_ testCases
  // || who gets @OneToMany => will be assigned the corresponding row from the other side of the relation
  @OneToMany(type => TestCaseEntity, TestCaseEntity => TestCaseEntity.testSuite, {
    nullable: true,
    cascade : true
  })
  test_cases: TestCaseEntity[];


} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°



