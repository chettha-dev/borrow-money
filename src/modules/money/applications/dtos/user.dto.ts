import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty({ message: 'name_required'})
  readonly name: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  readonly phone: string;
}
