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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
