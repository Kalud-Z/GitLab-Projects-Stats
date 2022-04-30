import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, ManyToOne, OneToMany} from 'typeorm';
import {GroupEntity} from '../../../_group-related-modules/group/model/group.entity';
import {PipelineEntity} from '../../../_pipeline-related-modules/pipeline/model/pipeline.entity';
import {ProjectStatsEntity} from '../../project-stats/model/project-stats.entity';
import {GroupInfoEntity} from '../../../_group-related-modules/group-info/model/group-info.entity';


@Entity()
export class ProjectEntity extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  gitlabId: number;

  @Column()
  name: string;


  @Column()
  urlToRepo: string;


  //_Many_ projects have _One_ group.
  @ManyToOne(type => GroupEntity, GroupEntity => GroupEntity.projects, {
    nullable: true,
    onDelete : "CASCADE"
  })
  group: GroupEntity;


  //_One_ project can have _Many_ pipelines
  // || who gets @OneToMany => will be assigned the corresponding row from the other side of the relation
  @OneToMany(type => PipelineEntity, PipelineEntity => PipelineEntity.project, {
    // cascadeUpdate: true
    cascade : true
  })
  pipelines: PipelineEntity[];


  //this is the side of the relation which gonna get assigned a row from the other side of the relation
  // => this is where we add the cascade options
  @OneToOne(() => ProjectStatsEntity, ProjectStatsEntity => ProjectStatsEntity.project , {
    // cascadeUpdate: true
    cascade : true
  })
  stats: ProjectStatsEntity;



  @OneToOne(() => GroupInfoEntity, GroupInfoEntity => GroupInfoEntity.project , {
    // cascadeUpdate: true
    cascade : true
  })
  groupInfo: GroupInfoEntity;



} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°




