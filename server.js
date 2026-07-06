const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("public"));

const Wallet = {
    address: "BFxAnfdAreXaKEvdeG4xQ7zbxxxxxxxxxxxxcDnLhZ",
    balance: 54
};

app.get("/api/wallet", async (req, res) => {

    try{

        const api = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd,brl"
        );

        const usd = api.data.solana.usd;
        const brl = api.data.solana.brl;

        res.json({

            address: Wallet.address,
            balance: Wallet.balance,
            usdPrice: usd,
            brlPrice: brl,
            totalUsd: (Wallet.balance*usd).toFixed(2),
            totalBrl: (Wallet.balance*brl).toFixed(2)

        });

    }catch(e){

        res.json({
            address: Wallet.address,
            balance:54,
            usdPrice:0,
            brlPrice:0
        });

    }

});

app.listen(3000,()=>{

console.log("Servidor iniciado");

});
