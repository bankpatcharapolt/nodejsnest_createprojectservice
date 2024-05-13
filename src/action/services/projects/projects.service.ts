import { HttpService, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { SolarProjectRelateSiteService } from '../../../shared/services';
import { UserDataDto } from '../../../shared/dto';

import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { CreateProjectDto } from 'src/action/dto';
import * as short from 'short-uuid';
import { Model, model, Document, Schema, Connection } from 'mongoose';
import { EntityManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from '../../entity/projects.entity';
import { ConflictException } from '@nestjs/common';
import to from 'await-to-js';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ProjectRelateSite } from '../../entity/project_relate_site.entity'
@Injectable()
export class ProjectsService extends SolarProjectRelateSiteService {
  logger = new Logger(ProjectsService.name);

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
    @InjectRepository(ProjectRelateSite)
    private readonly projectRelateSite: Repository<ProjectRelateSite>,
  )  {
    super();


  }

  async updateProjectName(projectId: any, projectName: string): Promise<void> {
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    project.project_name = projectName;
    await this.projectRepository.save(project);
  }

  async deleteProjectRelateSite(projectId: any, siteId: string): Promise<void> {
    // Check if project with given projectId exists
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) {
        throw new Error('Project with given projectId does not exist');
    }

    // Delete the record from project_relate_site table
    const result = await this.projectRelateSite.delete({ project_id: projectId, site_id: siteId });
    if (result.affected === 0) {
        throw new Error('Record not found or already deleted');
    }
}


  async insertProjectRelateSite(projectId: any, siteId: string , type:string): Promise<void> {
    // Check if project with given projectId exists
    const project = await this.projectRepository.findOne({ where: { id:projectId } });
    if (!project) {
      throw new Error('Project with given projectId does not exist');
    }

    const existingRecord = await this.projectRelateSite.findOne({ where: { project_id: projectId, site_id: siteId , type:type } });
    if (existingRecord) {
        throw new ConflictException('Duplicate entry for project_id and site_id');
    }

       

    // Insert into project_relate_site table
    const newProjectRelateSite = this.projectRelateSite.create({
      project_id : projectId,
      site_id : siteId,
      type:type,
      created: new Date(),
      updated: new Date(),
    });
    console.log(newProjectRelateSite);
    await this.projectRelateSite.save(newProjectRelateSite);
  }


  async getProject(projectId: any): Promise< Projects[]> {
    let project:any;
    if(projectId == "all"){
       project = await this.projectRepository.find({ relations: ['projectRelateSite'] });
    }else{
       project = await this.projectRepository.find({ where: { id: projectId }, relations: ['projectRelateSite'] });
       project = [project]; // Wrap the single project in an array
    }
    
    if (!project) {
      throw new NotFoundException();
    }
    return project;


  }
  
  async getProjectbyUser(userId: any): Promise< Projects[]> {
    let project:any;
    if(userId == "all"){
       project = await this.projectRepository.find({ relations: ['projectRelateSite'] });
    }else{
       project = await this.projectRepository.find({ where: { user_id: userId }, relations: ['projectRelateSite'] });
       project = [project]; // Wrap the single project in an array
    }
    
    if (!project) {
      throw new NotFoundException();
    }
    return project;


  }
  
  async createIfNotExist(createProjectDto:CreateProjectDto): Promise<Projects> {
    const { project_name ,user_id} = createProjectDto;
    
    let project = await this.projectRepository.findOne({ where: { project_name: project_name,user_id:user_id } });
    if (project) {
      throw new ConflictException(`Project with name '${project_name}' already exists.`);
    }

    if (!project) {
      project = this.projectRepository.create({ project_name ,user_id});
      await this.projectRepository.save(project);
    }
    console.log(project)
    return project;
  }
 




}
