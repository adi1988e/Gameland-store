import Stripe from "stripe";
const stripe = Stripe(process.env.VITE_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  const { totalAmount } = JSON.parse(event.body);
  const calculateOrderAmount = () => {
    return Math.round(totalAmount);
  };
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "usd",
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
