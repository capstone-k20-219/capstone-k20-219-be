import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { GlobalModule } from './shared/modules/global.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { VehicleTypesModule } from './vehicle-types/vehicle-types.module';
import { CommentsModule } from './comments/comments.module';
import { ParkingSlotsModule } from './parking-slots/parking-slots.module';
import { ServicesModule } from './services/services.module';
import { ParkingTicketsModule } from './parking-tickets/parking-tickets.module';
import { ServiceBookingsModule } from './service-bookings/service-bookings.module';
import { SlotBookingsModule } from './slot-bookings/slot-bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
      autoLoadEntities: true,
      synchronize: false,
    }),
    GlobalModule,
    UserModule,
    AuthModule,
    VehiclesModule,
    VehicleTypesModule,
    CommentsModule,
    ParkingSlotsModule,
    ServicesModule,
    ParkingTicketsModule,
    ServiceBookingsModule,
    SlotBookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
