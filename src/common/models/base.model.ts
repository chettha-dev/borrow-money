import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';
import { IEvent } from '@nestjs/cqrs';

export class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'create_date',
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'update_date',
  })
  updateDate: Date;

  @Exclude()
  @ApiHideProperty()
  events: IEvent[] = [];
}
