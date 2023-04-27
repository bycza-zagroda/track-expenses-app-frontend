import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Wallet} from "./wallets/wallet.entity";
import {Transaction} from "./transactions/transaction.entity";
import {Category} from "./categories/category.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AppController} from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Wallet, Transaction, Category]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DATABASE_HOST'),
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        entities: [Wallet, Transaction, Category],
        synchronize: true, // should not be used in production
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
