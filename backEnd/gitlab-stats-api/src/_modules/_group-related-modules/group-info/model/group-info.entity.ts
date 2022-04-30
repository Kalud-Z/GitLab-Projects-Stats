import {ProjectEntity} from '../../../_project-related-modules/project/model/project.entity';
import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class GroupInfoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gitlabId: number;


  @Column()
  name : string


  @OneToOne(() => ProjectEntity, ProjectEntity => ProjectEntity.groupInfo , {
    onDelete : "CASCADE"
  })
  @JoinColumn()
  project: ProjectEntity;


} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°







