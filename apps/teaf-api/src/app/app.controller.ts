import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transactions/transaction.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  @Get()
  getData() {
    // example method, to be removed
    return this.transactionRepository.find({
      where: {
        wallet: {
          id: 3,
        },
        category: {
          id: 9,
        },
      },
    });
  }
}
