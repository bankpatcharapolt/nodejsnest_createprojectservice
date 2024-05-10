// project-relate-site.entity.ts
import { Entity, Column, PrimaryGeneratedColumn , JoinColumn ,ManyToOne} from 'typeorm';

import { Projects } from './projects.entity'



@Entity({ name: 'project_relate_site' })
export class ProjectRelateSite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: string;

  @Column()
  site_id: string;

  @Column()
  type: string;



  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated: Date;

  @ManyToOne(() => Projects, project => project.projectRelateSite)
  @JoinColumn({ name: 'project_id' })
  projects: Projects;
}
