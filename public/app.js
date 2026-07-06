async function carregar(){

const dados = await fetch("/api/wallet");

const json = await dados.json();

document.getElementById("wallet").innerHTML=json.address;

document.getElementById("balance").innerHTML=
json.balance+" SOL";

document.getElementById("usd").innerHTML=
"US$ "+json.totalUsd;

document.getElementById("brl").innerHTML=
"R$ "+json.totalBrl;

}

carregar();

setInterval(carregar,10000);
