import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export default function Payment({ params }: { params: { payment: string } }) {
	const payment = params.payment;
	const decodedPayment = decodeURIComponent(payment);
	const parsedPayment = JSON.parse(decodedPayment);
	const { orderId, items } = parsedPayment;
	console.log(parsedPayment);

	const handlePayment = async () => {
		'use server';

		if (!process.env.STRIPE_SECRET_KEY) {
			throw new Error('Missing Stripe secret key env ');
		}

		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: '2023-10-16',
			typescript: true,
		});
		const checkoutSession = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			metadata: {
				cardId: orderId,
			},
			line_items: [
				{
					price_data: {
						currency: 'pln',
						product_data: { name: items[0].title },
						unit_amount: +items[0].price * 100,
					},
					quantity: items[0].quantity,
				},
			],
			mode: 'payment',

			success_url:
				'http://192.168.50.226:3000/status/success?sessionId={CHECKOUT_SESSION_ID}',
			cancel_url:
				'http://192.168.50.226:3000/status/cancel?sessionId={CHECKOUT_SESSION_ID}',
		});
		if (!checkoutSession.url) {
			throw new Error('Something went wrong with Stripe');
		}

		redirect(checkoutSession.url);
	};

	return (
		<div className="bg-white min-h-screen grid place-items-center">
			<div>
				<h1 className="text-black font-bold text-2xl">Payment</h1>
				<p className='text-black mb-5' >Click to redirect to payment gateway</p>

				<form action={handlePayment}>
					<button className="bg-lime-600 rounded-md px-10 p-3 text-black border " type="submit">
						Pay
					</button>
				</form>
			</div>
		</div>
	);
}
