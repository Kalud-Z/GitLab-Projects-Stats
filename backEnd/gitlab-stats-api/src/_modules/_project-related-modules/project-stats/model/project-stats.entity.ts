import {ProjectEntity} from '../../project/model/project.entity';
import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class ProjectStatsEntity extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable : true })
  status: string;


  @Column()
  numberOfPipelines: number;

  @Column()
  areTestsAvailable : boolean;


  @Column()
  areTestCoveragesAvailable : boolean;

  @Column()
  numberOfTestReports: number;

  @Column({ type: 'double precision' })
  averageDurationOfPipelines : number;

  @Column({ type: 'double precision' })
  averageDurationOfPipelines_inMinutes : number;

  @Column({ nullable : true , type: 'double precision' })
  testCoverage: number;

  @Column()
  numberOfSuccessfulPipelines : number;

  @Column()
  numberOfFailedPipelines : number;

  @Column()
  numberOfCanceledPipelines : number;

  @Column()
  numberOfRunningPipelines : number;

  @Column()
  numberOfSkippedPipelines : number;

  @Column({ type: 'double precision' , nullable : true })
  pipelinesSuccessRatio : number;

  @Column({ nullable : true  , type: 'bigint' })
  totalRepoSize : number;

  @Column({ nullable : true , type: 'bigint' })
  artifactsSize : number;


  @OneToOne(() => ProjectEntity, ProjectEntity => ProjectEntity.stats , {
    onDelete : "CASCADE"
  })
  @JoinColumn()
  project: ProjectEntity;


} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°







