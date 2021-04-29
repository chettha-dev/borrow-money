import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../commands';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../../domains/repositories';
import { Inject } from '@nestjs/common';
import { UserFactory } from '../../../domains/factories';
import { UserModel } from '../../../domains/models/user.model';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(@InjectRepository(UserRepository)
              private readonly userRepo: UserRepository,
              @Inject(UserFactory)
              private readonly userFactory: UserFactory) {
  }

  async execute({data}: RegisterUserCommand): Promise<UserModel> {
    const entity = this.userFactory.create(data);

    return await this.userRepo.save(entity);
  }
}
