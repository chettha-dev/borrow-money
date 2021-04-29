import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class BorrowDto{
  @ApiProperty({
    type: Number,
  })
  @IsNotEmpty({ message: 'amount_required'})
  readonly amount: number
}