import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate , ManyToOne, JoinColumn , OneToMany } from 'typeorm';
import { ProjectRelateSite} from './project_relate_site.entity'

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  project_name: string;

  @Column({ length: 10 ,nullable:true})
  user_id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

//   @ManyToOne(() => ProjectRelateSite, projectRelateSite => projectRelateSite.projects)
//   @JoinColumn({ name: 'project_id' }) // Change to the actual foreign key column name
//   projectRelateSite: ProjectRelateSite;

  @OneToMany(() => ProjectRelateSite, projectRelateSite => projectRelateSite.projects)
  projectRelateSite: ProjectRelateSite[];

  // Add more columns as needed based on your database schema

  @BeforeInsert()
  setTimestamps() {
    const now = new Date();
    this.created = now;
    this.updated = now;
  }

  @BeforeUpdate()
  setUpdated() {
    this.updated = new Date();
  }
}

