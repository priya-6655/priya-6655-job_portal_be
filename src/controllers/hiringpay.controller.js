const hiringpay = require('../model/hiringpay.model');
const RegCompany = require('../model/companyReg.model')
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const payment = async (req, res) => {
    try {
        const { fullname, email, company, plan, amount } = req.body;

        const numericAmount = parseFloat(String(amount).replace(/[^0-9.]/g, ''));
        if (isNaN(numericAmount)) {
            return res.status(400).json({ error: 'Invalid amount value' });
        }
        console.log("Frontend Amount:", amount);
        console.log("Parsed Numeric Amount:", numericAmount);

        // Create customer record inside stripe
        const stripeCustomer = await stripe.customers.create({
            name: fullname,
            email: email,
        });

        // Create PaymentIntent. it tracks the entire lifecycle of transaction
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(numericAmount * 100),
            currency: 'inr',
            customer: stripeCustomer.id,
            description: `Payment for ${plan} plan by ${company}`,
            automatic_payment_methods: { enabled: true },
        });
        console.log("PaymentIntent:", paymentIntent);

        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
        console.log("Returning clientSecret:", paymentIntent.client_secret);

    } catch (err) {
        console.error('Stripe Error:', err);
        res.status(500).json({ error: err.message });
    }
};

const paymentSuccess = async (req, res) => {
    try {
        const { fullname, email, company, plan, amount, paymentId } = req.body

        const expiryDate = plan === "Monthly"
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

        const subscribe = await RegCompany.update({
            isSubscribed: true,
            subscriptionPlan: plan,
            subscriptionAmount: amount,
            subscribedOn: new Date(),
            subscriptionExpiry: expiryDate
        }, { where: { email } })

        await hiringpay.create({
            fullname,
            email,
            company,
            plan,
            amount,
            paymentId,
            paymentDate: new Date()
        })
        const updatedCompany = await RegCompany.findOne({ where: { email }, raw: true });
        res.status(200).json({ message: "Payment recorded & subscription activated", data: updatedCompany });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { payment, paymentSuccess };
