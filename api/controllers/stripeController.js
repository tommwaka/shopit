import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);

// Make payment
export const makePayment = async (req, res) => {
	stripe.charges.create(
		{
			source: req.body.tokenId,
			amount: req.body.amount,
			currency: "kes",
		},
		(stripeErr, stripeRes) => {
			stripeErr
				? res.status(500).json(stripeErr)
				: res.status(200).json(stripeRes);
		}
	);
};
