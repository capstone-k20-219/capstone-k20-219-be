import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service, ServicePrice } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServicePrice])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
