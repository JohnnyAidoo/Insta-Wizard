import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDatabase from "@/lib/database";
import User from "@/lib/database/models/users";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("stripe-signature");

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        (await request.body) as unknown as string,
        signature as string,
        webhookSecret
      );
    } catch (err: any) {
      console.error("Webhook error:", err.message);
      return NextResponse.json(
        { message: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Handle subscription events
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        const subscription = event.data.object;
        await User.findOneAndUpdate(
          { stripeCustomerId: subscription.customer },
          {
            subscriptionStatus: subscription.status,
            subscriptionId: subscription.id,
            subscriptionPlan: subscription.items.data[0].price.id,
            subscriptionCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000
            ),
          }
        );
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object;
        await User.findOneAndUpdate(
          { stripeCustomerId: deletedSubscription.customer },
          {
            subscriptionStatus: "canceled",
            subscriptionCurrentPeriodEnd: new Date(
              deletedSubscription.current_period_end * 1000
            ),
          }
        );
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
