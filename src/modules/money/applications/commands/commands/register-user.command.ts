import { ICommand } from '@nestjs/cqrs';
import { UserDto } from '../../dtos';

export class IRegisterUserCommand extends UserDto {}

export class RegisterUserCommand implements ICommand {
  constructor(public readonly data: IRegisterUserCommand) {
  }
}
