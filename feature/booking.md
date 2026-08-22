1. Integrate payments
2. Add <script src="https://checkout.razorpay.com/v1/checkout.js"></script>  
3. Add a book button too
4. Create new route on server
```js
bookingsRouter.post("/", requireAuth, bookingController.createBooking);

```
```js

    const handleBuyClick = async (type) => {
        const order = await axios.post(
            URLS.BASE + "/payment/create",
            {
                membershipType: type,
            },
            { withCredentials: true }
        );

        const { amount, keyId, currency, notes, orderId } = order.data;

        const options = {
            key: keyId,
            amount,
            currency,
            name: "Dev Tinder",
            description: "Connect to other developers",
            order_id: orderId,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: "9999999999",
            },
            theme: {
                color: "#F37254",
            },
            handler: verifyPremiumUser,
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };
```