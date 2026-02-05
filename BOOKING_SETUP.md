# Booking System Setup Guide
## Las Vegas Logic Media

This guide will walk you through setting up the complete booking system with Stripe payment integration.

---

## 📋 What Was Built

The booking system includes:

1. **booking.html** - Complete booking form with 6 sections
2. **booking.js** - Form validation and submission logic
3. **confirmation.html** - Post-booking confirmation page
4. **confirmation.js** - Displays booking details
5. **Stripe Integration** - Accept credit card payments
6. **Invoice Option** - Request invoice via Netlify Forms
7. **Netlify Serverless Function** - Handles Stripe checkout

---

## 🚀 Deployment Steps

### Step 1: Install Dependencies

From your project root directory, run:

```bash
npm install
```

This will install the Stripe SDK required for the serverless function.

---

### Step 2: Set Up Stripe Account

#### Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up for a free account
3. Complete the account verification process

#### Get Your API Keys
1. Log in to your Stripe Dashboard
2. Click **Developers** in the left sidebar
3. Click **API keys**
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...` for test mode)
   - **Secret key** (starts with `sk_test_...` for test mode)

⚠️ **IMPORTANT:** Never commit your secret key to Git. Keep it secure.

---

### Step 3: Configure Stripe in Your Code

#### Update booking.js (Line 479)

Open `/booking.js` and find this line:

```javascript
const stripe = Stripe('pk_test_YOUR_STRIPE_KEY_HERE');
```

Replace `pk_test_YOUR_STRIPE_KEY_HERE` with your actual **Publishable Key** from Stripe:

```javascript
const stripe = Stripe('pk_test_51AbCdEf...');
```

---

### Step 4: Configure Netlify Environment Variables

#### In Netlify Dashboard:

1. Go to your site in Netlify
2. Click **Site configuration** → **Environment variables**
3. Click **Add a variable**
4. Add the following variables:

| Key | Value | Description |
|-----|-------|-------------|
| `STRIPE_SECRET_KEY` | `sk_test_...` | Your Stripe Secret Key |
| `URL` | `https://www.lvlogicmedia.com` | Your site URL |

⚠️ **CRITICAL:** Use **test keys** (starting with `sk_test_`) until you're ready to go live.

#### Add variables using Netlify CLI (Alternative):

```bash
netlify env:set STRIPE_SECRET_KEY "sk_test_YOUR_SECRET_KEY_HERE"
netlify env:set URL "https://www.lvlogicmedia.com"
```

---

### Step 5: Deploy to Netlify

#### If using Git (Recommended):

```bash
git add .
git commit -m "Add booking system with Stripe integration"
git push origin main
```

Netlify will automatically deploy your changes.

#### If using Netlify CLI:

```bash
netlify deploy --prod
```

---

### Step 6: Configure Netlify Forms (For Invoice Option)

1. Go to your Netlify Dashboard
2. Navigate to **Forms** in the left sidebar
3. Once someone submits the invoice form, you'll see entries here
4. Set up **Form notifications**:
   - Click on the `booking-invoice` form
   - Click **Settings and usage**
   - Click **Form notifications**
   - Add your email: `lasvegaslogicmedia@gmail.com`
   - Choose notification type: **New form submission**

---

## 🧪 Testing the Booking System

### Test Mode with Stripe

Use these **test card numbers** for testing payments:

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 9995` | Payment declined (insufficient funds) |
| `4000 0025 0000 3155` | Requires authentication (3D Secure) |

**For all test cards:**
- Use any future expiration date (e.g., 12/25)
- Use any 3-digit CVC (e.g., 123)
- Use any ZIP code (e.g., 12345)

### Testing the Complete Flow

#### Test 1: Pay Now (Stripe)
1. Go to [https://www.lvlogicmedia.com/pricing](https://www.lvlogicmedia.com/pricing)
2. Select the **BASE Package** ($295)
3. Optionally add add-ons
4. Click **Proceed to Booking**
5. Fill out all required fields:
   - Property details
   - Appointment date (tomorrow or later)
   - Contact information
6. Select **Pay Now**
7. Check **Terms and Conditions**
8. Click **PLACE ORDER**
9. Enter test card: `4242 4242 4242 4242`
10. Complete payment
11. You should be redirected to the confirmation page

#### Test 2: Invoice Me
1. Follow steps 1-5 above
2. Select **Invoice Me**
3. Check **Terms and Conditions**
4. Click **PLACE ORDER**
5. You should be redirected to the confirmation page
6. Check your Netlify Dashboard → Forms to see the submission
7. Check your email for the form notification

### Verify Payments in Stripe Dashboard

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Payments** in the left sidebar
3. You should see test payments listed
4. Click on a payment to see full details including customer info and metadata

---

## 🔐 Security Checklist

- [ ] Never commit `STRIPE_SECRET_KEY` to Git
- [ ] Use test keys (`sk_test_...`) until ready for production
- [ ] Verify environment variables are set in Netlify
- [ ] Test both payment flows (Pay Now and Invoice)
- [ ] Check that confirmation emails are being sent
- [ ] Verify form submissions appear in Netlify Dashboard

---

## 🌐 Going Live (Production)

When ready to accept real payments:

### Step 1: Activate Stripe Account
1. Go to Stripe Dashboard
2. Click **Activate your account**
3. Complete business information
4. Add bank account for payouts
5. Wait for approval (usually instant)

### Step 2: Switch to Live Keys
1. In Stripe Dashboard, toggle from **Test mode** to **Live mode**
2. Get your live API keys:
   - **Publishable key**: `pk_live_...`
   - **Secret key**: `sk_live_...`

### Step 3: Update Environment Variables
1. In Netlify Dashboard → Environment variables:
   - Update `STRIPE_SECRET_KEY` to your **live secret key** (`sk_live_...`)

### Step 4: Update booking.js
Replace the test publishable key with your live publishable key:

```javascript
const stripe = Stripe('pk_live_YOUR_LIVE_KEY_HERE');
```

### Step 5: Deploy
```bash
git add booking.js
git commit -m "Switch to Stripe live keys"
git push origin main
```

⚠️ **IMPORTANT:** Test thoroughly with real cards before announcing to customers!

---

## 📊 Monitoring & Analytics

### View Bookings
- **Stripe Payments**: [Stripe Dashboard → Payments](https://dashboard.stripe.com/payments)
- **Invoice Requests**: [Netlify Dashboard → Forms](https://app.netlify.com)

### Track Metrics
Monitor these in your analytics:
- Booking form completion rate
- "Pay Now" vs "Invoice Me" selection ratio
- Average order value
- Mobile vs desktop bookings

---

## 🐛 Troubleshooting

### Issue: "Payment system not loaded" error
**Solution:** Make sure Stripe.js is loaded in booking.html:
```html
<script src="https://js.stripe.com/v3/"></script>
```

### Issue: Serverless function returns 500 error
**Solution:**
1. Check Netlify function logs: Dashboard → Functions → Logs
2. Verify `STRIPE_SECRET_KEY` environment variable is set
3. Make sure `npm install` ran successfully

### Issue: Form submits but no data in Netlify Forms
**Solution:**
1. Verify the hidden form exists in booking.html with `netlify` attribute
2. Check the form name matches: `booking-invoice`
3. Wait a few minutes - submissions can take time to appear

### Issue: Redirect to confirmation page fails
**Solution:**
1. Verify `netlify.toml` includes redirect rules
2. Check that `confirmation.html` exists
3. Look for JavaScript errors in browser console

### Issue: Booking data not showing on confirmation page
**Solution:**
1. Check browser localStorage for `bookingData`
2. Verify URL parameters are being passed: `?order=XXX&status=XXX&email=XXX`
3. Open browser console to see any JavaScript errors

---

## 📞 Support

If you encounter issues:

1. Check browser console for JavaScript errors (F12 → Console)
2. Check Netlify function logs in Dashboard
3. Review Stripe logs in Dashboard → Developers → Logs
4. Test with Stripe test cards first
5. Verify all environment variables are set correctly

---

## 🎯 Next Steps (Future Enhancements)

Once the basic system is working, consider:

- [ ] Integrate with Google Calendar for real-time availability
- [ ] Add email confirmations via SendGrid/Mailgun
- [ ] Create admin dashboard to manage bookings
- [ ] Add SMS reminders via Twilio
- [ ] Implement automatic appointment confirmation
- [ ] Add ability to reschedule appointments
- [ ] Track booking analytics in Google Analytics
- [ ] Add testimonials/reviews post-service

---

## 📝 File Structure

```
/
├── booking.html                    # Main booking form
├── booking.js                      # Form logic & validation
├── confirmation.html               # Success page
├── confirmation.js                 # Confirmation page logic
├── pricing-calculator.js           # Updated to redirect to /booking
├── package.json                    # Node dependencies (Stripe)
├── netlify.toml                    # Netlify configuration
├── .netlify/
│   └── functions/
│       └── create-checkout.js      # Stripe serverless function
└── styles.css                      # Includes booking & confirmation styles
```

---

## ✅ Deployment Checklist

Before going live:

- [ ] Run `npm install` to install Stripe dependency
- [ ] Update `booking.js` with Stripe publishable key
- [ ] Set Stripe secret key in Netlify environment variables
- [ ] Test "Pay Now" with test card `4242 4242 4242 4242`
- [ ] Test "Invoice Me" and verify form submission in Netlify
- [ ] Verify confirmation page displays correctly
- [ ] Test on mobile devices
- [ ] Check all form validations work
- [ ] Ensure date picker only allows future dates
- [ ] Test form auto-save and restore on page refresh
- [ ] Verify email notifications are being sent
- [ ] Review Stripe Dashboard to confirm test payments appear

---

## 🎉 You're All Set!

Your booking system is now ready to accept orders. Customers can:

1. Browse your services on the pricing page
2. Select packages and add-ons
3. Proceed to the booking form
4. Fill out property and appointment details
5. Choose to pay now via Stripe OR request an invoice
6. Receive a confirmation page with order number
7. Get email confirmation (once configured)

**Remember:** Start in test mode, thoroughly test both payment flows, then switch to live keys when ready!

---

Last Updated: 2026-02-05
