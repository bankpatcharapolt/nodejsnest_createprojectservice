import {
  Controller,
  Logger,
  Get,
  Param,
  Query,
  InternalServerErrorException,
  NotFoundException,
  HttpCode,
  Post,
  Body,
  BadRequestException,
  Patch,
  Delete,
  Res,
  ConflictException
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import to from 'await-to-js';

import { JwtAuthGuard } from '../../../auth/guards';

import { SwaggerMessage } from '../../../shared/enums';

import { ProjectsService } from '../../services';
import { CreateProjectDto } from 'src/action/dto';
import { CreateProjectRelateSiteDto } from 'src/action/dto/create-project-relate-site.dto';
import { DeleteProjectRelateSiteDto } from 'src/action/dto/delete-project-relate-site.dto';
// import { ServicesDto } from 'src/action/dto';


@Controller('project')
@ApiTags('project')
@ApiBadRequestResponse({ description: SwaggerMessage.BAD_REQUEST })
@ApiInternalServerErrorResponse({
  description: SwaggerMessage.INTERNAL_SERVER_ERROR,
})

export class ServicesController {
  logger = new Logger(ServicesController.name);

  constructor(
    private projectService: ProjectsService,
   ) {}

  @Get(':projectId')
  @HttpCode(200)
  @ApiBadRequestResponse({ description: SwaggerMessage.BAD_REQUEST })
  async getProjects(@Param('projectId') projectId: string) {
  
    const errorMessageTitle = 'Get Project';
    const [error, result] = await to(this.projectService.getProject( projectId));
    console.log(result);
    if (error) {
      let status: number = error instanceof ConflictException ? 404 : 500;
    
      return {
        status: false,
        result_code: '-002',
        result_desc: error instanceof NotFoundException ? 'Project Not found' : 'Something went wrong on our server'
      };
    }
    return {
      status: true,
      data:result,
      result_code: '000',
      result_desc: "success"
    };
  }

  @Get('user/:userId')
  @HttpCode(200)
  @ApiBadRequestResponse({ description: SwaggerMessage.BAD_REQUEST })
  async getProjectByUser(@Param('userId') userId: string) {
  
    const errorMessageTitle = 'Get Project By User';
    const [error, result] = await to(this.projectService.getProjectbyUser( userId));
    console.log(result);
    if (error) {
      let status: number = error instanceof ConflictException ? 404 : 500;
    
      return {
        status: false,
        result_code: '-002',
        result_desc: error instanceof NotFoundException ? 'Project Not found' : 'Something went wrong on our server'
      };
    }
    return {
      status: true,
      data:result,
      result_code: '000',
      result_desc: "success"
    };
  }

  @Patch(':projectId')
  @HttpCode(200)
  async updateProjectName(
    @Param('projectId') projectId: string,
    @Body('project_name') projectName: string,
  ): Promise<any> {
    const [error, result] = await to(this.projectService.updateProjectName(projectId, projectName));
    if (error) {
      let status: number = error instanceof ConflictException ? 404 : 500;
      return {
        status: false,
        result_code: '-002',
        result_desc: error instanceof NotFoundException ? 'Project Not found' : 'Something went wrong on our server'
      };
    }

    return {
      status: true,
      result_code: '000',
      result_desc: 'Project name updated successfully'
    };
  }

  @Post('site')
  @HttpCode(200)
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async insertProjectRelateSite(@Body() createProjectRelateSiteDto: CreateProjectRelateSiteDto) {
    const { project_id, site_id ,type} = createProjectRelateSiteDto;
    try {
      await this.projectService.insertProjectRelateSite(project_id, site_id , type);
      return {
        status: true,
        result_code: '000',
        result_desc: 'Success',
      };
    } catch (error) {
      return {
        status: false,
        result_code: '-002',
        result_desc: error.message,
      };
    }
  }


@Delete('site')
@HttpCode(200)
@ApiBadRequestResponse({ description: 'Bad Request' })
async deleteProjectRelateSite(@Body() deleteProjectRelateSiteDto: DeleteProjectRelateSiteDto) {
    const { project_id, site_id } = deleteProjectRelateSiteDto;
    try {
        await this.projectService.deleteProjectRelateSite(project_id, site_id);
        return {
            status: true,
            result_code: '000',
            result_desc: 'Success',
        };
    } catch (error) {
        return {
            status: false,
            result_code: '-002',
            result_desc: error.message,
        };
    }
}

  @Post('')
  @HttpCode(200)
  @ApiBadRequestResponse({ description: SwaggerMessage.BAD_REQUEST })
  async createProject(@Body() createProjectDto: CreateProjectDto) { 
    const errorMessageTitle = 'Create Project';
    const [error, result] = await to(this.projectService.createIfNotExist(createProjectDto));
    if (error) {
      let status: number = error instanceof ConflictException ? 409 : 500;
    
      return {
        status: false,
        result_code: '-002',
        result_desc: error instanceof ConflictException ? 'Project Already Exist' : 'Something went wrong on our server'
      };
    } else {
      return {
        status: true,
        data:result,
        result_code: '000',
        result_desc: 'Success'
      };
    }

  }



 
}
