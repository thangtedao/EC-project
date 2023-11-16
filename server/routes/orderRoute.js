import express from "express";
import { Stripe } from "stripe";

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async (req, res) => {
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
    line_items,
    mode: "payment",
    success_url: "http://localhost:5173/checkout-success",
    cancel_url: "http://localhost:5173/cart",
  });

  res.json({ url: session.url });
});

export default router;
