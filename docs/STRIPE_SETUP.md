# Stripe Setup Playbook

Reusable step-by-step guide based on the ScribeFlow Stripe integration.

## Goal
Add Stripe subscription billing to a Next.js app with:
- Free plan
- Paid monthly plan
- Stripe Checkout
- Stripe Customer Portal
- Webhook verification
- In-app billing status

---

## 1. Work in Stripe Test Mode
Always start in Stripe **Test mode / Sandbox**.

In newer Stripe UI:
- switch to **Sandbox**
- confirm the dashboard says **Test mode** / **You're using test data**

Do **not** use live keys for initial integration.

---

## 2. Create Product + Recurring Price
In Stripe:
- go to **Products**
- click **Add product**

Recommended initial setup:
- Product name: `YourApp Pro`
- Pricing model: `Recurring`
- Billing period: `Monthly`
- Amount: e.g. `$10`

After saving, collect:
- `prod_...` product id
- `price_...` price id

The **Price ID** is what the app uses for Stripe Checkout.

---

## 3. Get Stripe Test API Keys
Go to:
- **Developers → API keys**

Collect:
- `pk_test_...` publishable key
- `sk_test_...` secret key

Use only test keys during setup.

---

## 4. Add App Environment Variables
Add these to your app env locally and/or in Vercel:

```env
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   # add after webhook setup
```

If using Vercel:
- add env vars in the project
- redeploy after changes

---

## 5. Add Pricing UI
Recommended first version:
- Free plan
- Pro plan ($10/month)

Best UX additions:
- dedicated `/pricing` page
- visible pricing nav link
- dashboard upgrade CTA such as **Upgrade** / **Go Unlimited**

---

## 6. Stripe Checkout Integration
Implement a server route such as:
- `POST /api/stripe/checkout`

Recommended behavior:
- require authenticated user
- create or reuse Stripe customer
- create Stripe Checkout Session in `subscription` mode
- pass Stripe price id from env
- add metadata like `auth0_sub` to help later customer/subscription matching
- success URL: `/dashboard?checkout=success`
- cancel URL: `/pricing?checkout=canceled`

Important lesson from ScribeFlow:
- add `auth0_sub` metadata not only where convenient, but in a way that can later be used for billing lookup

---

## 7. Customer Portal Setup
In Stripe:
- search **Customer portal**
- open portal settings
- activate it

Recommended settings:
- Update payment method = ON
- Cancel subscriptions = ON
- View invoices = ON
- Switch plans = OFF initially
- Change quantity = OFF initially

Set return URL to something like:

```text
https://yourapp.com/dashboard#settings
```

In the app, add a route such as:
- `POST /api/stripe/portal`

That route should:
- find the current user's Stripe customer
- create a Customer Portal session
- redirect the user to Stripe portal

---

## 8. Webhook Setup
In Stripe:
- go to **Developers → Webhooks**
- add destination / webhook endpoint

Use endpoint:

```text
https://yourapp.com/api/stripe/webhook
```

Subscribe to these events:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`

After creation:
- reveal the signing secret
- copy `whsec_...`
- set it as `STRIPE_WEBHOOK_SECRET`
- redeploy

---

## 9. Billing Status in the App
Add an API route such as:
- `GET /api/billing`

Dashboard/account area should show:
- current plan
- subscription status
- next billing / period end if available
- manage billing button

### Important lesson from ScribeFlow
Do **not** rely only on Stripe **customer metadata**.

Billing sync became more reliable after:
1. checking customer metadata first
2. then checking **subscription metadata** for `auth0_sub`
3. backfilling the Stripe customer metadata when missing
4. handling duplicate customers for the same email carefully

If Checkout succeeds but dashboard still shows Free/warning, the bug is often in customer/subscription matching logic.

---

## 10. Known Good UX Pattern
Recommended behavior after checkout:
- success returns to dashboard
- dashboard shows plan status
- dashboard includes **Manage billing**
- `/pricing` remains available for comparison

If billing data fails to load:
- do **not** crash dashboard SSR
- show a graceful warning
- let the page remain usable

---

## 11. Common Problems We Hit

### Problem: billing warning even after successful checkout
Cause:
- subscription was created, but app couldn't match user to Stripe customer/subscription

Fix:
- use subscription metadata lookup
- backfill customer metadata
- improve duplicate-email customer resolution

### Problem: dashboard crash when Stripe data missing
Fix:
- wrap billing lookup in try/catch
- return safe snapshot instead of crashing SSR

### Problem: checkout works but plan does not update
Fix:
- ensure webhook is configured
- ensure real `STRIPE_WEBHOOK_SECRET` is set
- redeploy after env update

### Problem: portal works but dashboard still warns
Fix:
- portal setup alone is not enough
- billing lookup logic still needs correct customer/subscription resolution

---

## 12. Test Flow Checklist
Use Stripe test card:

```text
4242 4242 4242 4242
```

With:
- any future expiry
- any CVC
- any ZIP

Then verify:
1. pricing page loads
2. paid plan starts Stripe Checkout
3. checkout success returns to dashboard
4. dashboard shows Pro
5. manage billing opens Customer Portal
6. unsubscribe works
7. dashboard updates afterward

---

## 13. Minimal Env Contract
```env
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Optional later:
- yearly price id
- separate test/live env pairs
- customer portal return URL config

---

## 14. Recommended Reuse Strategy
For now, keep Stripe simple:
- copy the known-good integration pattern into each project
- reuse this playbook
- only extract a reusable Stripe starter/module after repeating the integration a few more times

This is the same strategy chosen for auth: simple first, abstraction later.

---

## 15. ScribeFlow-Specific Values Used During Setup
Test values used during this integration:
- Product ID: `prod_ULp6X4zPmhzFf6`
- Price ID: `price_1TN7S0Iw0COX5znQ3l6qubkg`

These are useful for ScribeFlow reference only. Future projects should create their own Stripe product/price objects.
