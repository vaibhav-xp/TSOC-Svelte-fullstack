import { bsv, DefaultProvider, Signer } from "scrypt-ts";
import { NeucronSigner } from 'neucron-signer';
import { Root } from "../../contracts/root";

let globalSigner: Signer;
let globalInstance: Root;

async function initializeSigner() {
    const provider = new DefaultProvider({ network: bsv.Networks.mainnet });
    const signer = new NeucronSigner(provider);
    await signer.login('sales@timechainlabs.io', 'string');
    await Root.loadArtifact();
    return signer;
}

// initializeSigner().then(sign => { globalSigner = sign });

export const actions = {
    lock: async ({ request }) => {
        try {
            globalSigner = await initializeSigner();
            const data = await request.formData();
            const amountValue = Number(data.get("amount"));
            const squareValue = Number(data.get("square"));

            if (isNaN(amountValue) || isNaN(squareValue)) {
                throw new Error("Form data is missing required fields.");
            }

            const amount = String(amountValue);
            const square = BigInt(squareValue);

            globalInstance = new Root(square);
            await globalInstance.connect(globalSigner);

            const deployTx = await globalInstance.deploy(amount);

            return {
                status: "locked",
                message: "Contract deployed successfully.",
                data: {
                    square: square,
                    tx_id: deployTx.id
                }
            };
        } catch (error) {
            return {
                status: null,
                message: "Transaction failed: " + error.message,
            };
        }
    },

    unlock: async ({ request }) => {
        try {
            const data = await request.formData();
            const rootValue = Number(data.get("root"));

            if (isNaN(rootValue)) {
                throw new Error("Form data is missing required fields.");
            }

            const root = BigInt(rootValue);

            await globalInstance.connect(globalSigner);
            const { tx: callTx } = await globalInstance.methods.unlock(root);

            return {
                status: "unlocked",
                message: "Unlocked successfully.",
                data: {
                    tx_id: callTx.id
                }
            };
        } catch (error) {
            return {
                status: "unlocked",
                message: "Transaction failed: " + error.message,
                data: {
                    tx_id: null
                }
            };
        }
    }
};