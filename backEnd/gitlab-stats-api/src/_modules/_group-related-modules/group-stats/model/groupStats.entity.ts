import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn} from 'typeorm';
import {GroupEntity} from '../../group/model/group.entity';


@Entity()
export class GroupStatsEntity extends BaseEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isThereSubgroups: boolean;

  @Column()
  numberOfProjects: number;

  @Column({ nullable : true , type: 'double precision' })
  testCoverageOfAllProjects: number;

  @Column()
  numberOfPipelines: number;

  @Column()
  numberOfTestReports: number;


  @OneToOne(() => GroupEntity, GroupEntity => GroupEntity.stats , {
    onDelete : "CASCADE"
  }) // specify inverse side as a second parameter
  @JoinColumn()
  group: GroupEntity;


} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°



