import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/guards/role/role.guard';

@Module({
  controllers: [CustomersController],
  providers: [
    CustomersService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  imports: [TypeOrmModule.forFeature([Customer])],
})
export class CustomersModule {}
