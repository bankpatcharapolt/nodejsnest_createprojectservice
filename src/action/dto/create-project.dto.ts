import { IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProjectDto {
  @ApiProperty({
    description: 'Project Name',
    required: true,
  })
  project_name: string;

  @ApiProperty({
    description: 'User ID',
    required: true,
  })
  user_id: string;

  


}
