import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestSuiteEntity } from '../../test-suite/model/test-suite.entity';


@Entity()
export class TestCaseEntity extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable : true })
  classname: string;

  @Column({ nullable : true ,  type: 'double precision' })
  execution_time: number;

  @Column({ nullable : true })
  name: string;

  @Column({ nullable : true })
  status: 'success' | 'failure' | 'skipped';

  @Column({ nullable : true })
  system_output: string;



  // _Many_ testCases belong to _One_ testSuite.
  // || who gets @ManyToOne => will have an extra column in its table pointing to the FK
  @ManyToOne(type => TestSuiteEntity, TestSuiteEntity => TestSuiteEntity.test_cases, {
    nullable: true,
    onDelete : "CASCADE"
  })
  testSuite: TestSuiteEntity;


} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°



