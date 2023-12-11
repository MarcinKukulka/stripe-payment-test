import { redirect } from 'next/navigation';
import Stripe from 'stripe';

type CartSuccessPageProps = {
	searchParams: {
		sessionId?: string;
	};
};

export default async function CartSuccessPage({
	searchParams,
}: CartSuccessPageProps) {
	if (!searchParams.sessionId) {
		redirect('/');
	}

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error('Missing STRIPE_SECRET_KEY');
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: '2023-10-16',
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(
		searchParams.sessionId
	);

	return (
		<>
			<div className="text-3xl p-10">
				<h1>Success!</h1>
				<p>Your payment status is:</p>
				<p className='text-lime-500'>{session.payment_status}</p>
			</div>
		</>
	);
}
