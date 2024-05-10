import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'BLS Portal Token',
    required: true,
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJudDE4OTIiLCJyZWZJRCI6IjE4OTIiLCJzZXNzaW9uSUQiOiJGODUxNzQ5Q0FEQzExNkJFM0FGQzVFQkU0NzMxQzU2NCIsInJvbGVzIjpbInN1cGVyLWFkbWluIl0sImZlYXR1cmVzIjpbImN1c3RvZHkubW9uZXktcmVwb3J0LnBhZ2UubWVudSIsImN1c3RvZHkudGFzay5wYWdlLm1lbnUiLCJvcGVuLWFjY291bnQucGFnZS5tZW51Iiwic2V0dGluZy5yb2xlLWxldmVscy5wYWdlLm1lbnUiLCJzZXR0aW5nLnJvbGVzLnBhZ2UubWVudSIsInNldHRpbmcudXNlcnMucGFnZS5tZW51Il0sImlhdCI6MTYyMjUxNjYwMSwiZXhwIjoxNjIyNjAzMDAxfQ._mWT-DcHzymR0OJM_vpTNnB0kEAuo_6dkFO2qGWFJ7o',
  })
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'IP Address',
    required: false,
    type: String,
    default: '',
    example: '127.0.0.1',
  })
  ipAddress: string;
}
