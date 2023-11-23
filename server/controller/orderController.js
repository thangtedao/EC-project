import { Stripe } from "stripe";
import Order from "../models/Order.js";

const stripe = Stripe(process.env.STRIPE_KEY);

export const stripePayment = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.user._id,
      cart: JSON.stringify(req.body.cart),
    },
  });

  const line_items = req.body.cart.map((item) => {
    return {
      price_data: {
        currency: "vnd",
        product_data: {
          name: item.name,
          images: [item.images[0]],
          description: item.description,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price,
      },
      quantity: item.count,
    };
  });

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: "http://localhost:5173/checkout-success",
    cancel_url: "http://localhost:5173/cart",
  });

  res.json({ url: session.url });
};

let endpointSecret;
// const endpointSecret =
//   "whsec_99790e278153b08aeb4d7857f693cca685b854d4c733b686450fb260424bda90";

export const stripeWebHook = async (req, response) => {
  const sig = req.headers["stripe-signature"];

  let data;
  let eventType;
  let event;

  if (endpointSecret) {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }
  console.log(eventType);

  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log(customer);
        console.log("data", data);
        createOrder(customer, data);
      })
      .catch((err) => console.log(err));
  }

  // Handle the event

  // switch (event.type) {
  //   case "payment_intent.succeeded":
  //     const paymentIntentSucceeded = event.data.object;
  //     // Then define and call a function to handle the event payment_intent.succeeded
  //     break;
  //   // ... handle other event types
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  response.send().end();
};

const createOrder = async (customer, data) => {
  try {
    const cart = JSON.parse(customer.metadata.cart);
    const products = cart.map((product) => {
      return {
        product: product._id,
        count: product.count,
        color: product.color,
      };
    });

    const newOrder = new Order({
      orderBy: customer.metadata.userId,
      products: products,
      paymentIntent: data.payment_intent,
    });

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
  }
};
