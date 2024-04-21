import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
import { ParkingHistoryModule } from './parking-history/parking-history.module';
import { ServiceBookingsModule } from './service-bookings/service-bookings.module';
import { SlotBookingsModule } from './slot-bookings/slot-bookings.module';
import { BillsModule } from './bills/bills.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    GlobalModule,
    UserModule,
    AuthModule,
    VehiclesModule,
    VehicleTypesModule,
    CommentsModule,
    ParkingSlotsModule,
    ServicesModule,
    ParkingHistoryModule,
    ServiceBookingsModule,
    SlotBookingsModule,
    BillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
