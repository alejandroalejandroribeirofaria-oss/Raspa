async function carregar() {

    try {

        const resposta = await fetch("/api/wallet");

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a API");
        }

        const json = await resposta.json();

        document.getElementById("wallet").textContent =
            json.wallet.address;

        document.getElementById("balance").textContent =
            `${json.wallet.balance} SOL`;

        document.getElementById("usd").textContent =
            `US$ ${json.total.usd}`;

        document.getElementById("brl").textContent =
            `R$ ${json.total.brl}`;

    } catch (err) {

        console.error(err);

        document.getElementById("wallet").textContent =
            "Carteira indisponível";

        document.getElementById("balance").textContent =
            "-- SOL";

        document.getElementById("usd").textContent =
            "US$ --";

        document.getElementById("brl").textContent =
            "R$ --";
    }

}

// Carrega imediatamente
carregar();

// Atualiza a cada 10 segundos
setInterval(carregar, 10000);
