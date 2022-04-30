import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PipelineEntity } from '../../pipeline/model/pipeline.entity';
import { TestSuiteEntity } from '../../test-suite/model/test-suite.entity';


@Entity()
export class TestReportEntity extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  error_count: number;

  @Column()
  failed_count: number;

  @Column()
  skipped_count: number;

  @Column()
  success_count: number;

  @Column()
  total_count: number;

  @Column({  type : 'double precision' })
  total_time: number;

  // @Column({ nullable : true })
  test_suites_temp: any;


  //_One_ testReport can have _Many_ testSuites
  // || who gets @OneToMany => will be assigned the corresponding row from the other side of the relation
  @OneToMany(type => TestSuiteEntity, TestSuiteEntity => TestSuiteEntity.testReport, {
    cascade : true
  })
  test_suites: TestSuiteEntity[];



  @OneToOne(() => PipelineEntity, PipelineEntity => PipelineEntity.testReport , {
    onDelete : "CASCADE"
  })

  @JoinColumn()
  pipeline: PipelineEntity;


} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


