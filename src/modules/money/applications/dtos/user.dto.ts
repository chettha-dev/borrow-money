import { IsNotEmpty, IsOptional } from 'class-validator';
export class UserDto {
  @IsNotEmpty({ message: 'name is required!'})
  readonly name: string;

  @IsOptional()
  readonly phone: string;
}
