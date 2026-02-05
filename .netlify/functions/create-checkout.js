// ===================================
// Netlify Serverless Function
// Stripe Checkout Session Creation
// ===================================

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // Parse request body
        const { amount, services, email, metadata } = JSON.parse(event.body);

        // Validate required fields
        if (!amount || !services || !email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields: amount, services, or email' })
            };
        }

        // Get the site URL from environment or use default
        const siteUrl = process.env.URL || 'https://www.lvlogicmedia.com';

        // Create line items for Stripe Checkout
        const lineItems = [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Las Vegas Logic Media Services',
                    description: services.join(', '),
                    images: ['https://www.lvlogicmedia.com/logo.png'], // Optional: Add your logo URL
                },
                unit_amount: amount * 100, // Convert dollars to cents
            },
            quantity: 1,
        }];

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${siteUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}&status=paid&email=${encodeURIComponent(email)}`,
            cancel_url: `${siteUrl}/booking?payment=cancelled`,
            customer_email: email,
            metadata: {
                ...metadata,
                services: services.join(', '),
                amount: amount.toString()
            },
            // Optional: Enable automatic tax calculation if configured in Stripe
            // automatic_tax: { enabled: true },
        });

        // Return the session ID to the client
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Adjust for production
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({
                id: session.id,
                url: session.url
            })
        };

    } catch (error) {
        console.error('Stripe Checkout Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to create checkout session',
                message: error.message
            })
        };
    }
};
