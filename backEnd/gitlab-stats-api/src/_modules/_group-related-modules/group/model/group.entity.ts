import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, OneToOne, ManyToOne} from 'typeorm';
import {ProjectEntity} from '../../../_project-related-modules/project/model/project.entity';
import {GroupStatsEntity} from '../../group-stats/model/groupStats.entity';


@Entity()
export class GroupEntity extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable : true })
  tempData: boolean;


  @Column()
  gitlabId: number;

  @Column({ nullable : true })
  name: string;




  //_One_ group can have _Many_ projects
  @OneToMany(type => ProjectEntity, ProjectEntity => ProjectEntity.group, {
    cascade : true
  })
  projects?: ProjectEntity[];


  @OneToOne(() => GroupStatsEntity, GroupStatsEntity => GroupStatsEntity.group , {
    cascade : true
  })
  stats: GroupStatsEntity;




  //++++++++++++++++++++++ self-referencing ++++++++++++++++++++++++++++++++++++++++++++++++

  @ManyToOne(type => GroupEntity, GroupEntity => GroupEntity.subGroups, { nullable : true })
  parentGroup: GroupEntity;

  @OneToMany(type => GroupEntity, GroupEntity => GroupEntity.parentGroup, {
    cascade : true
  })
  subGroups: GroupEntity[];



} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°




