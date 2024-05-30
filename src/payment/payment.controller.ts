import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import Stripe from 'stripe';
import { PaymentInfoDto } from './dto/payment.dto';

const stripe = new Stripe(process.env.STRIPE_API_KEY_SECRET);

@Controller('payment')
@ApiTags('Payment')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor() {}

  @Post('payment-checkout')
  async handlePaymentWithStripe(
    @Req() req: Request,
    @Res() res: Response,
    @Body() paymentDto: PaymentInfoDto,
  ) {
    // Use an existing Customer ID
    const { id: userId } = req['user'];
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2024-04-10' },
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentDto.amount,
      currency: 'usd',
      customer: customer.id,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter
      // is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.STRIPE_API_KEY_PUBLISHABLE,
    });
  }
}
