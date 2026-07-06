const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("public"));

const Wallet = {
    address: "BFxAnfdAreXaKEvdeG4xQ7zbxxxxxxxxxxxxcDnLhZ",
    balance: 54.05346000
};

app.get("/api/wallet", async (req, res) => {

    try {

        const [dexRes, coinRes] = await Promise.all([

            axios.get(
                "https://api.dexscreener.com/latest/dex/tokens/So11111111111111111111111111111111111111112"
            ),

            axios.get(
                "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd,brl"
            )

        ]);

        const usd = coinRes.data.solana.usd;
        const brl = coinRes.data.solana.brl;

        const pair = dexRes.data.pairs?.[0] || {};

        res.json({

            wallet: {
                address: Wallet.address,
                balance: Wallet.balance
            },

            price: {
                usd,
                brl
            },

            total: {
                usd: (Wallet.balance * usd).toFixed(2),
                brl: (Wallet.balance * brl).toFixed(2)
            },

            dex: {
                chain: pair.chainId,
                dex: pair.dexId,
                priceUsd: pair.priceUsd,
                priceNative: pair.priceNative,
                liquidity: pair.liquidity?.usd,
                volume24h: pair.volume?.h24,
                fdv: pair.fdv,
                marketCap: pair.marketCap,
                pairAddress: pair.pairAddress,
                url: pair.url
            }

        });

    } catch (err) {

        console.error(err.message);

        res.status(500).json({

            error: true,
            message: "Erro ao consultar APIs.",

            wallet: {
                address: Wallet.address,
                balance: Wallet.balance
            }

        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`🚀 Servidor iniciado na porta ${PORT}`);

});
