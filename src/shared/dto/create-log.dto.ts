import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDefined, IsIn } from 'class-validator';

export class CreateLogDto {
  @ApiProperty({
    description: `Log Reference Type (Accept Only 'new_account', 'global')`,
    required: true,
    example: 'new_account',
  })
  @IsNotEmpty({
    message: 'refType is required',
  })
  @IsIn(['new_account', 'global', 'fund'], {
    message: 'refType is invalid',
  })
  refType: string;

  @ApiProperty({
    description: `Log Reference ID`,
    required: true,
    example: '12345',
  })
  @IsNotEmpty({
    message: 'refID is required',
  })
  refID: string;

  @ApiProperty({
    description: `Log Action`,
    required: true,
    example: 'create new application',
  })
  @IsNotEmpty({
    message: 'action is required',
  })
  action: string;

  @ApiProperty({
    description: `Log Remark`,
    required: false,
    example: 'Set New Application',
  })
  @IsDefined()
  remark: string;

  @ApiProperty({
    description: `Created By`,
    required: true,
    example: 'User',
  })
  @IsNotEmpty({
    message: 'createdBy is required',
  })
  createdBy: string;

  @ApiProperty({
    description: `Created Log IP Address`,
    required: true,
    example: '127.0.0.1',
  })
  @IsNotEmpty({
    message: 'ipAddress is required',
  })
  ipAddress: string;
}
