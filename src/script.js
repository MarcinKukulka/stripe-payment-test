async function sendDataToExternalService() {
	const order = Shopify.checkout;
	const paymentData = {
		orderId: order.order_id,
		amount: order.total_price,
		currencyCode: order.currency,
		customerEmail: order.email,
		customerName: order.billing_address.last_name,
		customerAddress: order.billing_address.address1,
	};
	const dataToStripe = JSON.stringify(paymentData);
	try {
		const response = await fetch('http://192.168.50.226:3000', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: dataToStripe,
		});
		if (response.ok) {
			console.log('Data sent', response);
		} else {
			console.error('Data not sent');
		}
	} catch (error) {
		console.error('Error: ', error);
	}
}
sendDataToExternalService();

const order = Shopify.checkout;
const paymentData = {
	orderId: order.order_id,
	amount: order.total_price,
	currencyCode: order.currency,
	customerEmail: order.email,
	customerName: order.billing_address.first_name,
	customerLastName: order.billing_address.last_name,
	customerAddress: order.billing_address.address1,
	orderNumber: order.order_number,
    items: order.line_items,
	gateway: order.gateway,
	shopId: '6189678695',
	shopName: 'qtalbumseu',
};
const dataToStripe = JSON.stringify(paymentData);
const codedData = encodeURIComponent(dataToStripe);

window.location.href = `http://192.168.50.226:3000/${codedData}`;

