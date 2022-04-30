import {BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProjectEntity} from '../../../_project-related-modules/project/model/project.entity';
import {PipelineStatsEntity} from '../../pipeline-stats/model/pipeline-stats.entity';
import {TestReportEntity} from '../../test-report/model/test-report.entity';


@Entity()
export class PipelineEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  gitlabId: number;


  @Column()
  status: string;


  // _Many_ pipelines have _One_ project.
  // || who gets @ManyToOne => will have an extra column in its table pointing to the FK
  @ManyToOne(type => ProjectEntity, ProjectEntity => ProjectEntity.pipelines, {
    nullable: true,
    onDelete : "CASCADE"
    // TODO : *) using migration => these options are NOT picked up by migrate:generate script.
    // *) without using migrations : typeorm des NOT pick up this change and add it to the table schema !!!
    // solution : delete all tables and regenerate them. :|
  })
  project: ProjectEntity;  //this will (autom.) transform into projectId



  @OneToOne(() => PipelineStatsEntity, PipelineStatsEntity => PipelineStatsEntity.pipeline , {
    // cascadeUpdate: true
    cascade : true
  })
  stats: PipelineStatsEntity;



  @OneToOne(() => TestReportEntity, TestReportEntity => TestReportEntity.pipeline , {
    // cascadeUpdate: true
    nullable: true,
    cascade : true
  })
  testReport: TestReportEntity;



} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°



