import NeucronSDK from "neucron-sdk";

export const actions = {
    login: async ({ request }) => {
        try {
            const data = await request.formData();
            const neucron = new NeucronSDK();
            const authModule = neucron.authentication;
            const walletModule = neucron.wallet;
            const email = data.get('email');
            const password = data.get("password");

            // Login to wallet
            const loginResponse = await authModule.login({ email, password });

            // For default wallet balance
            const defaultWalletBalance = await walletModule.getWalletBalance({});
            const balance = defaultWalletBalance.data?.balance?.summary;

            if (!balance) {
                throw new Error('Failed to retrieve wallet balance');
            }

            return {
                isLoggedIn: true,
                email,
                password,
                balance
            };
        } catch (error) {
            return {
                isLoggedIn: false,
                message: error.message || 'Login failed'
            };
        }
    },

    'send-to-paymail': async ({ request }) => {
        try {
            const data = await request.formData();
            const email = data.get('email');
            const password = data.get("password");
            const paymail = data.get("paymail");
            const note = data.get("note");
            const amount = data.get("amount");

            if (!paymail || !note || !amount) {
                throw new Error('All fields are required');
            }

            const neucron = new NeucronSDK();
            const authModule = neucron.authentication;
            const walletModule = neucron.wallet;


            // Login to wallet
            await authModule.login({ email, password });
            const defaultWalletBalance = await walletModule.getWalletBalance({});
            const balance = defaultWalletBalance.data?.balance?.summary;

            // Create payment options
            const options = {
                outputs: [
                    {
                        address: paymail,
                        note,
                        amount: parseFloat(amount)
                    }
                ]
            };

            // Send payment
            const payResponse = await neucron.pay.txSpend(options);

            return {
                isLoggedIn: true,
                txid: payResponse.data.txid,
                balance,
                message: 'Payment sent successfully.'
            };
        } catch (error) {
            return {
                isLoggedIn: true,
                message: error.message || 'Payment failed'
            };
        }
    }
}