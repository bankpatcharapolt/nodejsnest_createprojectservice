import { IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProjectRelateSiteDto {
  @ApiProperty({
    description: 'Project Id',
    required: true,
  })
  project_id: string;

  @ApiProperty({
    description: 'Site Id',
    required: true,
  })
  site_id: string;

  @ApiProperty({
    description: 'Site Type : solar or renac or hybridpro',
    required: true,
  })
  type: string;

  


}
