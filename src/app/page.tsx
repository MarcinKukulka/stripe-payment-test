import Stripe from 'stripe';

import { handleRedirectData } from '@/app/api/fetchPaymentData/route';

async function handleStripePaymentAction() {
	'use server';
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error('Missing Stripe secret key env ');
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: '2023-10-16',
		typescript: true,
	});
}

 

export default function Home() {
	return (
		<main>
			<form action={handleStripePaymentAction} className="ml-auto">
				<button
					type="submit"
					className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
				>
					Pay
				</button>
			</form>
			<div className="flex flex-col items-center justify-center min-h-screen py-2"></div>
		</main>
	);
}
