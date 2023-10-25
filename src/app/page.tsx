import Stripe from 'stripe';
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
function handleExternalMessage(event: MessageEvent) {
	if (event.origin !== 'https://example.com') {
		return;
	}

	const data = event.data;
	console.log('Received message:', data);
}

window.addEventListener('message', handleExternalMessage);

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
		</main>
	);
}
