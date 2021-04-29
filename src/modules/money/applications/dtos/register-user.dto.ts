import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsOptional()
  readonly ownerId?: string;

}
