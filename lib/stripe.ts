// src/lib/stripe.ts
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export async function createCustomer(email: string, name?: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        system: "madrasah-pro",
      },
    });
    return customer;
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    throw error;
  }
}

export async function createSubscription(customerId: string, priceId: string) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });
    return subscription;
  } catch (error) {
    console.error("Error creating Stripe subscription:", error);
    throw error;
  }
}

export async function createPaymentLink(params: {
  priceId: string;
  quantity?: number;
  metadata?: Record<string, string>;
}) {
  try {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [
        {
          price: params.priceId,
          quantity: params.quantity || 1,
        },
      ],
      metadata: params.metadata,
      after_completion: {
        type: "redirect",
        redirect: {
          url: `${process.env.NEXTAUTH_URL}/payment/success`,
        },
      },
    });
    return paymentLink;
  } catch (error) {
    console.error("Error creating Stripe payment link:", error);
    throw error;
  }
}

export async function createCheckoutSession(params: {
  customerId?: string;
  priceId: string;
  quantity?: number;
  metadata?: Record<string, string>;
  successUrl: string;
  cancelUrl: string;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: params.customerId,
      line_items: [
        {
          price: params.priceId,
          quantity: params.quantity || 1,
        },
      ],
      mode: "subscription",
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
      subscription_data: {
        metadata: params.metadata,
      },
    });
    return session;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw error;
  }
}

export async function handleWebhook(body: string, signature: string) {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChange(event.data.object);
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaid(event.data.object);
        break;
      case "invoice.payment_failed":
        await handleInvoiceFailed(event.data.object);
        break;
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Webhook error:", error);
    throw error;
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Update subscription in database
  console.log("Subscription updated:", subscription.id);
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // Update payment status in database
  console.log("Invoice paid:", invoice.id);
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  // Handle failed payment
  console.log("Invoice failed:", invoice.id);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Handle successful checkout
  console.log("Checkout completed:", session.id);
}
