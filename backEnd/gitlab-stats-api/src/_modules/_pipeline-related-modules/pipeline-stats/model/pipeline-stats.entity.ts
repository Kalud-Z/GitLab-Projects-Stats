import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {PipelineEntity} from '../../pipeline/model/pipeline.entity';


@Entity()
export class PipelineStatsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isTestReportAvailable: boolean;

  @Column({ type : 'double precision' , nullable : true })
  duration: number;

  @Column({type : 'double precision'})
  duration_inMinutes: number;

  @Column()
  created_at: string;

  @Column()
  created_at_rawDateFormat: Date;

  @Column({ nullable : true , type : 'double precision' })
  testCoverage: number;



  @OneToOne(() => PipelineEntity, PipelineEntity => PipelineEntity.stats , {
    onDelete : "CASCADE"
  })
  @JoinColumn()
  pipeline: PipelineEntity;


} //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°


